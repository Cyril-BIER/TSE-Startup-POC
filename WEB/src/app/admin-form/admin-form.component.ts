import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { STATUS } from 'src/environments/env';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';

/**
 * Composant Angular pour le formulaire d'administration des utilisateurs.
 *  Le formulaire permet de modifier le rôle d'un utilisateur ou changer son manager responsable.
 */
@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit {
  userForm!: FormGroup;
  formId!: string;
  status = STATUS;
  user!: User;
  managers!: User[];

  /**
   * Constructeur du composant.
   * @param fb Constructeur de formulaire
   * @param router Service de routage
   * @param route Service de routage activé
   * @param adminservice Service d'administration des utilisateurs
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminservice: AdminService,
  ) {}

  /** Méthode d'initialisation du composant. */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.formId = params['id'];
      console.log(this.formId);
    });
    this.initializeForm();
    this.adminservice.getAllManagers().subscribe((managers) => {
      this.managers = managers;
    });
    if (this.formId) {
      this.user;
      this.userForm.patchValue({});
    } else {
      this.router.navigate(['/admin']);
    }
  }

  /** Initialise le formulaire de l'utilisateur. */
  private initializeForm(): void {
    this.userForm = this.fb.group({
      choice: ['', Validators.required],
      statut: [''],
      managerId: [''],
    });
  }

  /** Soumettre le formulaire d'administration de l'utilisateur. */
  onSubmit(): void {
    // Changer le rôle de l'utilisateur.
    if (this.userForm.get('choice')?.value == 'role') {
      if (this.userForm.get('statut')?.value == 'ROLE_ADMIN') {
        this.adminservice.userToAdmin(this.formId).subscribe((res) => {
          console.log(res);
          alert('User mis à jour');
          this.fermer();
        });
      } else {
        // Changer le manager responsable de l'utilisateur.
        this.adminservice.userToManager(this.formId).subscribe((res) => {
          console.log(res);
          alert('User mis à jour');
          this.fermer();
        });
      }
    } else {
      this.adminservice
        .changeManager(this.formId, this.userForm.get('managerId')?.value)
        .subscribe((res) => {
          console.log(res);
          alert('User mis à jour');
          this.fermer();
        });
    }
  }

  fermer(): void {
    this.router.navigate(['/admin']);
  }
}
