import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Temps } from '../models/temps';
import { Projet } from '../models/projet';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getProjets().subscribe((projects) => {
      console.log(projects);
      this.projets = projects;
    });
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

  fermer() {
    this.router.navigate(['/temps']);
  }
}
