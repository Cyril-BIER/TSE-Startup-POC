import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Projet } from '../models/projet';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css'],
})
export class ProjetComponent implements OnInit {
  projets: MatTableDataSource<Projet> = new MatTableDataSource<Projet>();
  displayedColumns: string[] = ['nom', 'responsable'];

  ngOnInit(): void {
    const p1: Projet = {
      nom: 'Startup poc',
      responsable_nom: 'EL GUERMAT',
      responsable_prenom: 'Mohamed',
    };
    const p2: Projet = {
      nom: 'Startup poc 2',
      responsable_nom: 'EL GUERMAT',
      responsable_prenom: 'Mohamed',
    };
    this.projets.data = [p1, p2];
  }
}
