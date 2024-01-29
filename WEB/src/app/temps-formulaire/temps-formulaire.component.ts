import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Temps } from '../models/temps';
import { Projet } from '../models/projet';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-temps-formulaire',
  templateUrl: './temps-formulaire.component.html',
  styleUrls: ['./temps-formulaire.component.css'],
})
export class TempsFormulaireComponent implements OnInit {
  tempsForm!: FormGroup;
  formId!: string;

  projets: Projet[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    const p1: Projet = {
      id: 1,
      nom: 'p1',
    };
    const p2: Projet = {
      id: 2,
      nom: 'p2',
    };
    const p3: Projet = {
      id: 3,
      nom: 'p3',
    };
    this.projets.push(p1);
    this.projets.push(p2);
    this.projets.push(p3);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

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

  onSubmit() {
    if (this.tempsForm.invalid) {
      return;
    }

    const selectedDate = this.tempsForm.get('date')?.value;
    const formattedDate = selectedDate.toISOString().split('T')[0];

    const formData = {
      userId: this.authService.whoAmI(),
      projectId: this.tempsForm.get('projet')?.value,
      duration: this.tempsForm.get('nbr_heures')?.value,
      date: formattedDate,
    };

    console.log(formData);
  }

  fermer() {
    this.router.navigate(['/temps']);
  }
}
