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
      console.log(res);
      if (res) {
        console.log(this.authService.whoAmI());
        console.log(this.authService.whatRole());
        switch (this.authService.whatRole()) {
          case 'ROLE_ADMIN':
            this.router.navigate(['/admin']);
            break;
          case 'ROLE_MANAGER':
            this.router.navigate(['/utilisateur']);
            break;
          default:
            this.router.navigate(['/temps']);
            break;
        }
      } else {
        alert('Identifiant ou mot de passe incorrect');
      }
    });
  }
}
