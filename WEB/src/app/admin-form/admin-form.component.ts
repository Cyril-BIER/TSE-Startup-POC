import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { STATUS } from 'src/environments/env';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ManagerService } from '../services/manager.service';
import {AdminService} from "../services/admin.service";

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
    private userService: UserService,
    private managerService: ManagerService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.formId = params['id'];
    });
    this.initializeForm();
    this.adminService.getAllManagers().subscribe((managers) => {
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
      statut: [''],
      id: [''],
      choice: ['', Validators.required],
    });
  }

  onSubmit(): void {
    //TODO : connect the endpoints
    if (this.userForm.get('choice')?.value == 'role') {
      const res = {
        userId: this.user.id,
      };
      console.log(res);
    } else {
      const res = {
        userId: this.user.id,
        managerId: this.userForm.get('id')?.value,
      };
      console.log(res);
    }
    alert('User mis à jour');
    this.fermer();
  }

  fermer(): void {
    this.router.navigate(['/admin']);
  }
}
