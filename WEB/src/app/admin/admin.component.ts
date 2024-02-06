import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ManagerService } from '../services/manager.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['nom', 'statut'];

  constructor(
    public authService: AuthService,
    private router: Router,
    private adminservice: AdminService,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.adminservice.getAllUsers().subscribe((users) => {
      this.adminservice.getAllManagers().subscribe((managers) => {
        this.users.data = [...users, ...managers];
        console.log(this.users.data);
      });
    });
  }

  redirectAdmin(id: number): void {
    this.router.navigate(['/adminForm', id]);
    return;
  }
}
