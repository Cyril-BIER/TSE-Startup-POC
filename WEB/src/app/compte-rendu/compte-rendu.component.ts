import {Component, OnInit} from '@angular/core';
import { jsPDF } from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'
import {MatTableDataSource} from "@angular/material/table";
import {ProjetCompteRendu} from "../models/projet.compteRendu";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.css']
})
export class CompteRenduComponent implements OnInit {
  projets: MatTableDataSource<ProjetCompteRendu> = new MatTableDataSource<ProjetCompteRendu>();
  displayedColumns: string[] = ['nom', 'heures'];
  isNotEditable: boolean;

  generatePdf() {
    const doc = new jsPDF()
    const data: string[][] = [];

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
    private authService: AuthService,) {
    this.isNotEditable = !this.authService.canAddImputation();
  }

  ngOnInit(): void {
    const p1: ProjetCompteRendu = {
      id: 0,
      nom: 'Startup poc',
      heures: '25h',
    };
    const p2: ProjetCompteRendu = {
      id: 1,
      nom: 'Startup poc 2',
      heures: '25h',
    };
    this.projets.data = [p1, p2];
  }
}
