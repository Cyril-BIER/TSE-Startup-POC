import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-adminmanager',
  templateUrl: './adminmanager.component.html',
  styleUrls: ['./adminmanager.component.css']
})

export class AdminmanagerComponent {
  searchText: string = '';
  isManagerListVisible: boolean = false;
  isManagerVisible: boolean = false;
  isCreationFormVisible: boolean = false;
  isManagerButtonVisible = false;
  hide = true;
  value = 'Clear me';
  form!: FormGroup;
  managers: {
    firstName: string,
    lastName: string,
    email: string
  }[] = [];
  selectedManager: string | null = null;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.getAllManagers();
  }

  ngOnInit(): void {
    // Initialisation du formulaire
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      motDePasse: ['', Validators.required]
    });
  }


  showManagers() {
    this.isManagerListVisible = true;
    this.isManagerVisible = false;
    this.isManagerButtonVisible = true;
  }

  hideManagers() {
    this.isManagerListVisible = false;
    this.isManagerVisible = false;
    this.isManagerButtonVisible = false;
  }

  showCreation() {
    this.isCreationFormVisible = true;
    this.isManagerVisible = false;
  }

  hideCreation() {
    this.isManagerVisible = false;
    this.isCreationFormVisible = false;
  }

  getAllManagers() {
    this.adminService.getAllManagers().subscribe((res) => {
      if (res != null) {
        res.forEach((manager: { id: any; firstName: any; lastName: any; email: any; password: any; }) => {
            console.log(manager)
          this.managers.push({
              firstName: manager.firstName,
              lastName: manager.lastName,
              email: manager.email
            });
          }
        )
      } else {
        alert("Il y a eu un problème pour récupérer les managers");
      }
    });
  }

  onSubmit(): void {
    const {nom, prenom, email, motDePasse} = this.form.value;
    // TODO : s'assurer que les noms et prenoms sont pris en compte
    this.adminService.createManager(email, nom, prenom, motDePasse).subscribe((res) => {
      console.log('manager created:', res);
      if (res) {
        this.managers.push({
          firstName: nom,
          lastName: prenom,
          email: email
        });
        this.isCreationFormVisible = false;
        this.form.reset();
      } else {
        alert("Il y a eu un problème pour enregistrer le manager");
      }
    });
  }

  findSelectedManager(): any {
    if (this.selectedManager != null) {
      return this.managers.find(manager => manager.firstName == this.selectedManager?.toString());
    }
    return null;
  }

  afficherManager() {
    this.isManagerListVisible = false
    this.isManagerVisible = true;
  }
}
