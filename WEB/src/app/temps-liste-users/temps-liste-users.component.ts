import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {ManagerService} from "../services/manager.service";

/**
 * Composant Angular pour afficher la liste des utilisateurs pour la gestion du temps.
 */
@Component({
  selector: 'app-temps-liste-users',
  templateUrl: './temps-liste-users.component.html',
  styleUrls: ['./temps-liste-users.component.css']
})

export class TempsListeUsersComponent {
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['nom'];

  /**
   * Constructeur du composant.
   * @param router Service de routage
   * @param managerService Service de gestion des managers
   */
  constructor(private router: Router,
              private managerService: ManagerService) {}

  /** Méthode d'initialisation du composant */
  ngOnInit(): void {
    this.managerService.getAttachedUsers().subscribe((users) => {
      this.users.data = users;
    });
  }

  /**
   * Redirige le manager vers la page de gestion du temps pour l'utilisateur spécifié.
   * @param id Identifiant de l'utilisateur
   */
  redirectUser(id: number): void {
    this.router.navigate(['/temps', id]);
    return;
  }
}
