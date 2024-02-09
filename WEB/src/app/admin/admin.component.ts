import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';

/**
 * Composant Angular pour la gestion des utilisateurs et managers par l'administrateur.
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['nom', 'statut'];

  /**
   * Constructeur du composant.
   * @param authService Service d'authentification
   * @param router Service de routage
   * @param adminService Service d'administration des utilisateurs
   */
  constructor(
    public authService: AuthService,
    private router: Router,
    private adminService: AdminService,
  ) {}

  /** Méthode d'initialisation du composant. */
  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((users) => {
      this.adminService.getAllManagers().subscribe((managers) => {
        this.users.data = [...users, ...managers];
        console.log(this.users.data);
      });
    });
  }

  /**
   * Redirige vers le formulaire d'administration pour un utilisateur spécifié.
   * @param id Identifiant de l'utilisateur à administrer
   */
  redirectAdmin(id: number): void {
    this.router.navigate(['/adminForm', id]);
    return;
  }
}
