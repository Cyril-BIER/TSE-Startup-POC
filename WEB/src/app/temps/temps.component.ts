import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Temps } from '../models/temps';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temps',
  templateUrl: './temps.component.html',
  styleUrls: ['./temps.component.css'],
})
export class TempsComponent implements OnInit {
  temps: MatTableDataSource<Temps> = new MatTableDataSource<Temps>();
  displayedColumns: string[] = ['nom', 'responsable'];

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  AddElement() {
    this.router.navigate(['/temps-formulaire']);
  }
}
