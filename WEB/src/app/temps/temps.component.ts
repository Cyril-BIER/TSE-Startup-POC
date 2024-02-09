import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Temps } from '../models/temps';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { ManagerService } from '../services/manager.service';

/**
 * Composant Angular pour la gestion du temps.
 */
@Component({
  selector: 'app-temps',
  templateUrl: './temps.component.html',
  styleUrls: ['./temps.component.css'],
})
export class TempsComponent implements OnInit {
  temps: MatTableDataSource<Temps> = new MatTableDataSource<Temps>();
  displayedColumns: string[] = ['projet', 'duree', 'date'];
  formId: string ='';

  /**
   * Constructeur du composant.
   * @param authService Service d'authentification
   * @param router Service de routage
   * @param route Service de routage pour les paramètres de route
   * @param userService Service utilisateur
   * @param managerService Service manager
   */
  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private managerService: ManagerService
  ) {}

  /** Méthode d'initialisation du composant */
  ngOnInit(): void {
    // Sélectionne la méthode appropriée en fonction du rôle de l'utilisateur
    switch (this.authService.whatRole()) {
      case 'ROLE_USER':
        this.userService.getImputation().subscribe((temps) => {
          console.log(temps);
          this.temps = temps;
        });
        break;
      case 'ROLE_MANAGER':
        this.route.params.subscribe((params) => {
          this.formId = params['id'];
        });
        this.managerService.getImputationUser(this.formId).subscribe((temps) => {
          this.temps = temps;
        });
        break;
    }
  }

  /** Redirige vers la page d'ajout d'une imputation */
  AddElement() {
    this.router.navigate(['/temps-formulaire']);
  }

  /**
   * Formate une chaîne de durée au format PT(HH)H(MM)M en texte.
   * @param timeString Chaîne de durée au format ISO 8601
   * @returns Chaîne de durée formatée
   */
  formatDurationString(timeString: string): string {
    const match = timeString.match(/PT(?:(\d+)H)?(?:(\d+)M)?S?/);
    if (!match) {
      return timeString;
    }
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const parts: string[] = [];
    if (hours > 0) {
      parts.push(`${hours} ${hours === 1 ? 'heure' : 'heures'}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
    }
    if (!parts.length) {
      parts.push('0 minutes');
    }
    return parts.join(' ');
  }
}
