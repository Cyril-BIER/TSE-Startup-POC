import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ManagerService} from "../services/manager.service";
import {AdminService} from "../services/admin.service";
@Component({
  selector: 'app-adminmanager',
  templateUrl: './adminmanager.component.html',
  styleUrls: ['./adminmanager.component.css']
})
export class AdminmanagerComponent {
  searchText: string = '';
  isUserListVisible: boolean = false;
  isUserVisible: boolean = false;
  isCreationFormVisible: boolean = false;
  isManagerButtonVisible = false;
  hide = true;
  value = 'Clear me';
  form!: FormGroup;
  users: {
    firstName: string,
    lastName: string,
    email: string
  }[] = [];
  selectedUser: string | null = null;
  projetsExistants: {
    nom: string;
  }[] = []

  manager: string;

  constructor(private fb: FormBuilder, private managerService: ManagerService, private adminService: AdminService) {
    let managerFromLocalStorage = localStorage.getItem('user');
    if (managerFromLocalStorage !== null) {
      this.manager = managerFromLocalStorage;
    } else {
      this.manager = "Pas de manager";
    }
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


  showUsers() {
    this.isUserListVisible = true;
    this.isUserVisible = false;
    this.isManagerButtonVisible = true;
  }

  hideUsers() {
    this.isUserListVisible = false;
    this.isUserVisible = false;
    this.isManagerButtonVisible = false;
  }

  showCreation() {
    this.isCreationFormVisible = true;
    this.isUserVisible = false;
  }

  hideCreation() {
    this.isUserVisible = false;
    this.isCreationFormVisible = false;
  }

  getAllManagers() {
    this.adminService.getAllManagers().subscribe((res) => {
      console.log('Get all users attached to the connected manager:', res);
      if (res != null) {
        res.forEach((user: { firstName: any; lastName: any; email: any; projets: any; managerName: any; }) => {
            console.log(user)
          this.users.push({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            });
          }
        )
      } else {
        alert("Il y a eu un problème pour récupérer les utilisateurs");
      }
    });
  }

  onSubmit(): void {
    const {nom, prenom, email, motDePasse} = this.form.value;
    const manager = localStorage.getItem('user');
    this.adminService.createManager(email, nom, prenom, motDePasse).subscribe((res) => {
      console.log('User created:', res);
      if (res) {
        // Projet vide à implementer plus tard
        this.users.push({
          firstName: nom,
          lastName: prenom,
          email: email
        });
        this.isCreationFormVisible = false;
        this.form.reset(); // Réinitialiser le formulaire ici
      } else {
        alert("Il y a eu un problème pour enregistrer l'utilisateur");
      }
    });
  }

  findSelectedUser(): any {
    if (this.selectedUser === null) {
      return null; // Si aucun utilisateur n'est sélectionné, retourne null
    }
    // @ts-ignore // car on enlève le cas ou selectedUser== null
    return this.users.find(user => user.firstName === this.selectedUser.toString());
  }

  afficherUtilisateur() {
    this.isUserListVisible = false
    this.isUserVisible = true;
  }
}
