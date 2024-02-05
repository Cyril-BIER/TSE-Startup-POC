import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ManagerService } from '../services/manager.service';
import { User } from '../models/user';

@Component({
  selector: 'app-projet-formulaire',
  templateUrl: './projet-formulaire.component.html',
  styleUrls: ['./projet-formulaire.component.css'],
})
export class ProjetFormulaireComponent implements OnInit {
  projetForm!: FormGroup;
  formId!: string;
  attachedUsers: User[] = [];
  selectedUserIds: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.managerService.getAttachedUsers().subscribe((users) => {
      console.log(users);
      this.attachedUsers = users;
    });
  }

  private initializeForm(): void {
    this.projetForm = this.fb.group({
      projet_nom: ['', Validators.required],
      projectUsers: [[]],
    });
  }

  toggleUserSelection(userId: string): void {
    const index = this.selectedUserIds.indexOf(userId);
    if (index === -1) {
      this.selectedUserIds.push(userId);
    } else {
      this.selectedUserIds.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.projetForm.valid) {
      const formData = {
        projectName: this.projetForm.get('projet_nom')?.value,
        projectUsers: this.selectedUserIds,
      };

      console.log(formData);
      this.managerService.postProject(formData).subscribe((res) => {
        console.log(res);
      });
      alert('Projet enregistré');
      this.fermer();
    }
  }

  fermer() {
    this.router.navigate(['/projet']);
  }
}
