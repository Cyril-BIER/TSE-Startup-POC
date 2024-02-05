import {Component, OnInit} from '@angular/core';
import {jsPDF} from 'jspdf'
import autoTable from 'jspdf-autotable'
import {MatTableDataSource} from "@angular/material/table";
import {ProjetCompteRendu} from "../models/projet.compteRendu";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.css']
})
export class CompteRenduComponent implements OnInit {
  projets: MatTableDataSource<ProjetCompteRendu> = new MatTableDataSource<ProjetCompteRendu>();
  displayedColumns: string[] = ['nom', "date", 'heures'];
  isNotEditable: boolean;

  generatePdf() {
    const doc = new jsPDF()
    const data: (string| number)[][] = [];

    this.projets.data.forEach(projet => {
      data.push([projet.nom, projet.heures]);
    });

    autoTable(doc, {
      head: [['Nom du projet', 'Heures effectuées']],
      body: data
    })

    doc.save('table.pdf')
    console.log('./table.pdf generated')
  }

  constructor(
    private authService: AuthService,
    private userService: UserService) {
    this.isNotEditable = !this.authService.canAddImputation();
  }

  ngOnInit(): void {
    this.getImputation();
  }

  getImputation() {
    this.userService.getImputation().subscribe((res) => {
      if (res != null) {
        console.log(res)

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
  editImputation(projet: ProjetCompteRendu) {
    projet.isEditing = true;
  }
  saveImputation(projet: ProjetCompteRendu) {
    this.userService.putImputation(projet.id,projet.heures).subscribe((res) => {
      if (res) {
        console.log("Imputation changed successfully")
      }
      else {
        console.log("erreur in changing the imputation")
      }
    })
    projet.isEditing = false;
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
