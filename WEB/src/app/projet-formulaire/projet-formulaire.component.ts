import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from '../services/manager.service';
import { User } from '../models/user';

/**
 * Composant Angular pour la création de projet.
 */
@Component({
  selector: 'app-projet-formulaire',
  templateUrl: './projet-formulaire.component.html',
  styleUrls: ['./projet-formulaire.component.css'],
})
export class ProjetFormulaireComponent implements OnInit {
  projetForm!: FormGroup;
  attachedUsers: User[] = [];
  selectedUserIds: string[] = [];

  /**
   * Constructeur du composant.
   * @param fb Constructeur de formulaire
   * @param router Service de routage
   * @param managerService Service de gestion des managers
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private managerService: ManagerService
  ) {}

  /** Méthode d'initialisation du composant */
  ngOnInit(): void {
    this.initializeForm();
    this.managerService.getAttachedUsers().subscribe((users) => {
      console.log(users);
      this.attachedUsers = users;
    });
  }

  /** Initialise le formulaire de création de projet */
  private initializeForm(): void {
    this.projetForm = this.fb.group({
      projet_nom: ['', Validators.required],
      projectUsers: [[]],
    });
  }

  /**
   * Gère la sélection ou la désélection d'un utilisateur pour le projet.
   * @param userId Identifiant de l'utilisateur
   */
  toggleUserSelection(userId: string): void {
    const index = this.selectedUserIds.indexOf(userId);
    if (index === -1) {
      this.selectedUserIds.push(userId);
    } else {
      this.selectedUserIds.splice(index, 1);
    }
  }

  /** Soumettre le formulaire de création de projet */
  onSubmit() {
    if (this.projetForm.valid) {
      const formData = {
        projectName: this.projetForm.get('projet_nom')?.value,
        projectUsers: this.selectedUserIds,
      };

      console.log(formData);
      this.managerService.postProject(formData).subscribe((res) => {
        console.log(res);
      });
      alert('Projet enregistré');
      this.fermer();
    }
  }

  /** Redirige vers la page de gestion des projets */
  fermer() {
    this.router.navigate(['/projet']);
  }
}
