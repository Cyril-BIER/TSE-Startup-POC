import {Component, OnInit} from '@angular/core';
import {ManagerService} from "../services/manager.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../models/user";
import {Router} from "@angular/router";

/**
 * Composant Angular pour la gestion des comptes rendus par le manager.
 * C'est la page d'accueil du manager, pour qu'il choisisse l'utilisateur à afficher
 */
@Component({
  selector: 'app-compte-rendu-manager',
  templateUrl: './compte-rendu-manager.component.html',
  styleUrls: ['./compte-rendu-manager.component.css']
})

export class CompteRenduManagerComponent implements OnInit {
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['nom'];

  /**
   * Constructeur du composant.
   * @param router Service de routage
   * @param managerService Service de gestion des managers
   */
  constructor(private router: Router,
              private managerService: ManagerService) {}

  /** Méthode d'initialisation du composant. */
  ngOnInit(): void {
    this.managerService.getAttachedUsers().subscribe((users) => {
        this.users.data = users;
      });
  }

  /**
   * Redirige vers la page de compte rendu pour un utilisateur spécifié.
   * @param id Identifiant de l'utilisateur
   * @param canAddImputation Indique si l'utilisateur peut ajouter une imputation
   */
  redirectUser(id: number,canAddImputation: boolean): void {
    this.router.navigate(['/compte-rendu', id,canAddImputation]);
    return;
  }
}
