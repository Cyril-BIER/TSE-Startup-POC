import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { STATUS } from 'src/environments/env';
import { User } from '../models/user';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.formId = params['id'];
    });
    this.initializeForm();
    if (this.formId) {
      console.log(this.formId);
      const u1: User = {
        id: 1,
        nom: 'EL GUERMAT',
        prenom: 'Mohamed',
        statut: 'ROLE_MANAGER',
      };
      const u2: User = {
        id: 2,
        nom: 'BIER',
        prenom: 'Cyril',
        statut: 'ROLE_USER',
      };
      this.managers = [u2];
      this.user = u1;
      this.user.id = parseInt(this.formId);
      this.userForm.patchValue({});
    } else {
      this.router.navigate(['/admin']);
    }
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      statut: ['', Validators.required],
      id: [''],
    });
  }

  onSubmit(): void {
    this.user.statut = this.userForm.get('statut')?.value;
    if (this.userForm.get('id')?.value != '') {
      const res = {
        user: this.user,
        managerId: this.userForm.get('id')?.value,
      };
      console.log(res);
    } else {
      console.log(this.user);
    }
    alert('User mis à jour');
    this.fermer();
  }

  fermer(): void {
    this.router.navigate(['/admin']);
  }
}
