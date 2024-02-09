import { Component} from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Composant Angular pour la barre de navigation de l'application.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  /**
   * Constructeur du composant.
   * @param authService Service d'authentification
   */
  constructor(public authService: AuthService) {}

  /** Gère la déconnexion de l'utilisateur. */
  logout(): void {
    this.authService.logout();
    window.location.replace('/');
  }
}
