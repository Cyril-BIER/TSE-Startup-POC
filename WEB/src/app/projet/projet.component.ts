import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Projet } from '../models/projet';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ManagerService } from '../services/manager.service';

/**
 * Composant Angular pour la gestion des projets.
 */
@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css'],
})
export class ProjetComponent implements OnInit {
  projets: MatTableDataSource<Projet> = new MatTableDataSource<Projet>();
  displayedColumns: string[] = ['nom', 'responsable', 'utilisateur'];

  /**
   * Constructeur du composant.
   * @param authService Service d'authentification
   * @param router Service de routage
   * @param userService Service utilisateur
   * @param managerService Service manager
   */
  constructor(
    public authService: AuthService,
    private router: Router,
    private userService: UserService,
    private managerService: ManagerService
  ) {}

  /** Méthode d'initialisation du composant */
  ngOnInit(): void {
    switch (this.authService.whatRole()) {
      case 'ROLE_USER':
        this.userService.getProjets().subscribe((projets) => {
          console.log(projets);
          this.projets.data = projets;
        });
        break;
      case 'ROLE_MANAGER':
        this.managerService.getProjects().subscribe((users) => {
          console.log(users);
          this.projets.data = users;
        });
        break;
    }
  }

  /** Redirige vers la page de création de projet */
  addProjet() {
    this.router.navigate(['/projetForm']);
  }
}
