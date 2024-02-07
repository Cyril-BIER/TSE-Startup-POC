import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../models/user';
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['nom', 'statut'];

  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((users) => {
      this.adminService.getAllManagers().subscribe((managers) => {
        this.users.data = users + managers;
      });
    });
  }

  redirectAdmin(id: number): void {
    this.router.navigate(['/adminForm', id]);
    return;
  }
}
