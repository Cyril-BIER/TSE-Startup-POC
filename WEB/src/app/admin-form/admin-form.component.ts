import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { STATUS } from 'src/environments/env';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ManagerService } from '../services/manager.service';
import { AdminService } from '../services/admin.service';

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
    private route: ActivatedRoute,
    private adminservice: AdminService,
    private managerService: ManagerService
  ) {}

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

  private initializeForm(): void {
    this.userForm = this.fb.group({
      choice: ['', Validators.required],
      statut: [''],
      managerId: [''],
    });
  }

  onSubmit(): void {
    if (this.userForm.get('choice')?.value == 'role') {
      if (this.userForm.get('statut')?.value == 'ROLE_ADMIN') {
        this.adminservice.userToAdmin(this.formId).subscribe((res) => {
          console.log(res);
          alert('User mis à jour');
          this.fermer();
        });
      } else {
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
    // alert('User mis à jour');
    // this.fermer();
  }

  fermer(): void {
    this.router.navigate(['/admin']);
  }
}
