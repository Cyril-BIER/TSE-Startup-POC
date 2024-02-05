import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['nom', 'statut'];

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const u1: User = {
      id: 1,
      lastName: 'EL GUERMAT',
      firstName: 'Mohamed',
      statut: 'Manager',
    };
    this.users.data.push(u1);
  }

  redirectAdmin(id: number): void {
    this.router.navigate(['/adminForm', id]);
    return;
  }
}
