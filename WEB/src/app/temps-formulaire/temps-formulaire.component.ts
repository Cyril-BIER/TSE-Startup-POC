import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Temps } from '../models/temps';
import { Projet } from '../models/projet';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TempsService } from '../services/temps.service';

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
    private userService: UserService,
    private tempsService: TempsService
  ) {
    this.userService.getProjets().subscribe((projects) => {
      console.log(projects);
      this.projets = projects;
    });
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
    if (this.tempsForm.valid) {
      const selectedDate = this.tempsForm.get('date')?.value;
      const year = selectedDate.getFullYear();
      const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
      const day = ('0' + selectedDate.getDate()).slice(-2);

      const formattedDate = `${year}-${month}-${day}`;

      const formData = {
        projectId: this.tempsForm.get('projet')?.value,
        duration: this.convertDurationToDecimal(
          this.tempsForm.get('nbr_heures')?.value
        ),
        date: formattedDate,
      };

      console.log(formData);
      this.tempsService.postTemps(formData).subscribe((res) => {
        console.log(res);
      });
      alert('Temps enregistré');
      this.fermer();
    }
  }

  fermer() {
    this.router.navigate(['/temps']);
  }

  convertDurationToDecimal(durationString: string): number {
    // imputation renvoie comme format : "PT1H30MIN"

    if (durationString === 'PT0S') {
      return 0; // Retourne 0 si la durée est nulle
    }

    // Si la durée est uniquement des minutes (format "PT30M")
    if (durationString.includes('M') && !durationString.includes('H')) {
      const minutes = parseInt(durationString.split('M')[0].substring(2));
      return minutes / 60;
    }

    const hourPart = durationString.split('H')[0];
    let minutePart = durationString.split('H')[1].replace('MIN', '');

    if (!minutePart.trim()) {
      minutePart = '0';
    }
    const hours = parseInt(hourPart.substring(2));
    const minutes = parseInt(minutePart);

    const totalHours = hours + minutes / 60;

    return Math.round(totalHours * 100) / 100;
  }
}
