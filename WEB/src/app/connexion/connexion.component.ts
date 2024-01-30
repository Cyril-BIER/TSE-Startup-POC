import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit {
  form!: FormGroup;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.logout();
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      identifiant: ['', Validators.required],
      motDePasse: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const { identifiant, motDePasse } = this.form.value;
    this.authService.login(identifiant, motDePasse).subscribe((res) => {
      console.log(this.authService.isLoggedIn());
      if (this.authService.isLoggedIn()) {
        console.log(this.authService.whatRole());
        this.router.navigate(['/temps']);
      } else {
        alert('Identifiant ou mot de passe incorrect');
      }
    });
  }
}
