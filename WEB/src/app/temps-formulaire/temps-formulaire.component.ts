import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Projet } from '../models/projet';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

/**
 * Composant Angular pour la gestion du formulaire de saisie du temps.
 */
@Component({
  selector: 'app-temps-formulaire',
  templateUrl: './temps-formulaire.component.html',
  styleUrls: ['./temps-formulaire.component.css'],
})
export class TempsFormulaireComponent implements OnInit {
  tempsForm!: FormGroup;
  formId!: string;

  projets: Projet[] = [];

  /**
   * Constructeur du composant.
   * @param fb Constructeur de formulaire
   * @param router Service de routage
   * @param userService Service utilisateur
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  /** Méthode d'initialisation du composant */
  ngOnInit(): void {
    this.userService.getProjets().subscribe((projects) => {
      console.log(projects);
      this.projets = projects;
    });
    this.initializeForm();
  }

  /** Initialise le formulaire de saisie du temps */
  private initializeForm(): void {
    this.tempsForm = this.fb.group({
      projet: ['', Validators.required],
      nbr_heures: [
        '',
        [Validators.required, Validators.min(0), Validators.max(24)],
      ],
      date: ['', Validators.required],
    });
  }

  /** Soumet le formulaire d'ajout d'une imputation*/
  onSubmit() {
    if (this.tempsForm.valid) {
      const selectedDate = this.tempsForm.get('date')?.value;
      const year = selectedDate.getFullYear();
      const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
      const day = ('0' + selectedDate.getDate()).slice(-2);

      const formattedDate = `${year}-${month}-${day}`;

      const formData = {
        projectId: this.tempsForm.get('projet')?.value,
        duration: this.tempsForm.get('nbr_heures')?.value,
        date: formattedDate,
      };

      console.log('temps', formData);
      this.userService.postImputation(formData).subscribe((res) => {
        console.log(res);
      });
      alert('Temps enregistré');
      this.fermer();
    }
  }

  /** Redirige vers la page principale de gestion du temps */
  fermer() {
    this.router.navigate(['/temps']);
  }
}
