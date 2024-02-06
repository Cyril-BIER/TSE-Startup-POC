import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  loggedIn: boolean = false;

  constructor(private router: Router, public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    window.location.replace('/');
  }
}
