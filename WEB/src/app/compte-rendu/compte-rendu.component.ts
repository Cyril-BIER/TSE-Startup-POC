import {Component, OnInit} from '@angular/core';
import {jsPDF} from 'jspdf'
import autoTable from 'jspdf-autotable'
import {MatTableDataSource} from "@angular/material/table";
import {ImputationCompteRendu} from "../models/imputationCompteRendu";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {compteRendu} from "../models/compte.rendu";
import {ActivatedRoute} from "@angular/router";
import {ManagerService} from "../services/manager.service";


@Component({
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.css']
})
export class CompteRenduComponent implements OnInit {
  projets: MatTableDataSource<ImputationCompteRendu> = new MatTableDataSource<ImputationCompteRendu>();
  displayedColumns: string[] = ['nom', "date", 'heures'];
  isNotEditable: boolean = false;
  formId!: string;

  monthReportData: compteRendu = {
    userId: 0,
    userName: '',
    yearMonth: '',
    workTimeReport: {}
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private managerService: ManagerService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    switch (this.authService.whatRole()) {
      case 'ROLE_USER':
        this.isNotEditable = !this.authService.canAddImputation();
        this.getImputation();
        if (!this.isNotEditable) {
          this.getMonthreportData();
        }
        break;
      case 'ROLE_MANAGER':
        this.route.params.subscribe((params) => {
          this.formId = params['id'];
        });
        this.getImputationUser();
        if(!this.isNotEditable) {
          this.getMonthreportDataUser();
        }
        break;
    }
  }

  generatePdf() {
    const doc = new jsPDF()
    const data: (string | number)[][] = [];

    doc.text('Rapport mensuel de travail de : ' + this.monthReportData.userName, 50, 20); // Positionnez le titre selon vos préférences

    const entriesOfWorkTimeReport = Object.entries(this.monthReportData.workTimeReport);
    entriesOfWorkTimeReport.forEach(([key, value]) => {
      const cleanedValue = value.replace(/[^0-9HM]/g, '');
      data.push([key, cleanedValue]);
    });


    autoTable(doc, {
      head: [['Nom du projet', 'Heures effectuées']],
      body: data,
      startY: 30
    })

    doc.save('table.pdf')
    console.log('./table.pdf generated')
  }

  getImputation() {
    this.userService.getImputation().subscribe((res) => {
      if (res != null) {
        this.projets.data = res.map((imputation: {
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
        });      }
    })

  }
  getImputationUser(){
    this.managerService.getImputationUser(this.formId).subscribe((res) => {
      if (res != null) {
        this.projets.data = res.map((imputation: {
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

  editImputation(projet
                   :
                   ImputationCompteRendu
  ) {
    projet.isEditing = true;
  }

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

  getMonthreportData() {
    this.userService.getMonthReport().subscribe((res) => {
      if (res != null) {
        this.monthReportData = res[0];
        console.log(res)
      }
    })
  }

  getMonthreportDataUser() {
    this.managerService.getMonthReportUser(this.formId).subscribe((res) => {
      if (res != null) {
        this.monthReportData = res[0];
        console.log(res)
      }
    })
  }

  enregistrerCompteRendu() {
    this.userService.createMonthReport().subscribe((res) => {
      if (res) {
        this.getMonthreportData();
      } else {
        console.log("Erreur")
      }
    })
  }

  convertDurationToDecimal(durationString: string): number {
    // imputation renvoie comme format : "PT1H30MIN"

    if (durationString === 'PT0S') {
      return 0; // Retourne 0 si la durée est nulle
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
}
