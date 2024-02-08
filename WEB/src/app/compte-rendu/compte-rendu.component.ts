import {Component, OnInit} from '@angular/core';
import {jsPDF} from 'jspdf'
import autoTable from 'jspdf-autotable'
import {MatTableDataSource} from "@angular/material/table";
import {ImputationCompteRendu} from "../models/imputationCompteRendu";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {compteRendu} from "../models/compte.rendu";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagerService} from "../services/manager.service";

/**
 * Composant Angular pour la gestion des comptes rendus :
 *    Modification des imputations et la génération des comptes rendus
 */
@Component({
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.css']
})

export class CompteRenduComponent implements OnInit {
  imputationCompteRendu: MatTableDataSource<ImputationCompteRendu> = new MatTableDataSource<ImputationCompteRendu>();
  displayedColumns: string[] = ['projet', "duree", 'date'];
  isNotEditable: boolean = true;
  formId!: string;
  isManager: boolean = false;
  moisActuel: string = '';
  anneeActuelle: string = '';
  monthReportData: compteRendu = {
    userId: 0,
    userName: '',
    yearMonth: '',
    workTimeReport: {}
  };

  /**
   * Constructeur du composant.
   * @param authService Service d'authentification
   * @param router Service de routage
   * @param userService Service utilisateur
   * @param managerService Service manager
   * @param route Service de routage activé
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private managerService: ManagerService,
    private route: ActivatedRoute) {}

  /** Méthode d'initialisation du composant. */
  ngOnInit(): void {
    const dateActuelle = new Date();
    this.moisActuel = dateActuelle.toLocaleString('default', { month: 'long' });
    this.anneeActuelle = dateActuelle.toLocaleString('default', { year: "numeric" });

    switch (this.authService.whatRole()) {
      case 'ROLE_USER':
        this.isNotEditable = this.authService.canAddImputation();
        this.getImputation();
        if (!this.isNotEditable) {
          this.getMonthreportData();
        }
        break;
      case 'ROLE_MANAGER':
        this.route.params.subscribe((params) => {
          this.formId = params['id'];
          this.isNotEditable = !(params['canAddImputation'] == "false");
          this.isManager = true;
        });
        this.getImputationUser();
        if(!this.isNotEditable) {
          this.getMonthreportDataUser();
        }
        break;
    }
  }

  /**
   * Génère un fichier PDF à partir des données du rapport mensuel.
   */
  generatePdf() {
    const doc = new jsPDF()
    const data: (string | number)[][] = [];

    doc.setFont("italic");
    doc.text('Rapport mensuel de travail de ' + this.monthReportData.userName, 55, 20);
    doc.text('du mois de '+ this.moisActuel + ' ' + this.anneeActuelle, 75, 30);


    const entriesOfWorkTimeReport = Object.entries(this.monthReportData.workTimeReport);
    entriesOfWorkTimeReport.forEach(([key, value]) => {
      const cleanedValue = value.replace(/[^0-9HM]/g, '');
      data.push([key, cleanedValue]);
    });

    autoTable(doc, {
      head: [['Nom du projet', 'Heures effectuées']],
      body: data,
      startY: 40
    })

    doc.save(`Compte_rendu_${this.monthReportData.userName}_${this.moisActuel}.pdf`)
    console.log('./table.pdf generated')
  }

  /**
   * Récupère les données d'imputation lorsque l'utilisateur est connecté.
   */
  getImputation() {
    this.userService.getImputation().subscribe((res) => {
      if (res != null) {
        this.imputationCompteRendu.data = res.map((imputation: {
          imputationId: any;
          userName: string;
          projectId: number;
          projectName: string;
          date: string;
          duration: string;
        }) => {
          return {
            id: imputation.imputationId,
            nom: imputation.projectName,
            date: imputation.date,
            heures: this.convertDurationToDecimal(imputation.duration),
            isEditing: false
          };
        });
      }
    })
  }

  /**
   * Récupère les données d'imputation pour un utilisateur lorsqu'un manager est connecté.
   */
  getImputationUser(){
    this.managerService.getImputationUser(this.formId).subscribe((res) => {
      if (res != null) {
        this.imputationCompteRendu.data = res.map((imputation: {
          imputationId: any;
          userName: string;
          projectId: number;
          projectName: string;
          date: string;
          duration: string;
        }) => {
          return {
            id: imputation.imputationId,
            nom: imputation.projectName,
            date: imputation.date,
            heures: this.convertDurationToDecimal(imputation.duration),
            isEditing: false
          };
        });
      }
    })
  }

  /**
   * Active le mode édition pour une imputation.
   * @param projet Imputation à éditer
   */
  editImputation(projet: ImputationCompteRendu) {
    projet.isEditing = true;
  }

  /**
   * Sauvegarde une imputation modifiée.
   * @param projet Imputation modifiée
   */
  saveImputation(projet: ImputationCompteRendu) {
    this.userService.putImputation(projet.id, projet.heures).subscribe((res) => {
      if (res) {
        console.log("Imputation changed successfully")
      } else {
        console.log("erreur in changing the imputation")
      }
    })
    projet.isEditing = false;
  }

  /**
   * Récupère les données du rapport mensuel lorsque l'utilisateur est connecté.
   */
  getMonthreportData() {
    this.userService.getMonthReport().subscribe((res) => {
      if (res != null) {
        this.monthReportData = res[0];
        console.log(res)
      }
    })
  }

  /**
   * Récupère les données du rapport mensuel pour un utilisateur lorsque le manger est connecté.
   */
  getMonthreportDataUser() {
    this.managerService.getMonthReportUser(this.formId).subscribe((res) => {
      if (res != null) {
        this.monthReportData = res[0];
        console.log(res)
      }
    })
  }

  /**
   * Enregistre le compte rendu.
   * Si la personne connectée est un manager, crée le rapport mensuel pour un utilisateur spécifié.
   * Sinon, crée le rapport mensuel pour l'utilisateur connecté.
   */
  enregistrerCompteRendu() {
    if(this.isManager) {
      this.managerService.createMonthReportUser(this.formId).subscribe((res) => {
        if (res) {
          this.getMonthreportData();
        } else {
          console.log("Erreur")
        }
      })
    }
    else {
      this.userService.createMonthReport().subscribe((res) => {
        if (res) {
          this.getMonthreportData();
        } else {
          console.log("Erreur")
        }
      })
    }
    this.isNotEditable = !this.isNotEditable;
    alert('Compte rendu enregistré');
    this.fermer();
  }

  /**
   * Redirige l'utilisateur vers la page précédente après la fermeture du composant.
   */
  fermer() {
    if (this.isManager) {
      this.router.navigate(['/compte-rendu-manager']);
    }
    else {
      this.router.navigate(['/compte-rendu']);
    }
  }

  /**
   * Convertit une durée au format "PT1H30MIN" en un nombre décimal d'heures.
   * @param durationString Chaîne de caractères représentant la durée
   * @returns Nombre décimal d'heures
   */
  convertDurationToDecimal(durationString: string): number {
    if (durationString === 'PT0S') {
      return 0;
    }

    // Si la durée est uniquement des minutes (format "PT30M")
    if (durationString.includes('M') && !durationString.includes('H')) {
      const minutes = parseInt(durationString.split('M')[0].substring(2));
      return minutes / 60;
    }

    const hourPart = durationString.split('H')[0];
    let minutePart = durationString.split('H')[1].replace('MIN', '');

    if (!minutePart.trim()) {
      minutePart = '0';
    }
    const hours = parseInt(hourPart.substring(2));
    const minutes = parseInt(minutePart);

    const totalHours = hours + (minutes / 60);

    return Math.round(totalHours * 100) / 100
  }

  /**
   * Vérifie si une imputation est éditable.
   * @param projet Imputation à vérifier
   * @returns Vrai si l'imputation est éditable, sinon faux
   */
  isImputationEditable(projet: ImputationCompteRendu) {
    return !projet.isEditing && this.isNotEditable && !this.isManager
  }
}
