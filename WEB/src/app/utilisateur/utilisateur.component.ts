import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ManagerService} from "../services/manager.service";
import {Router} from "@angular/router";

/**
 * Créer ou afficher un utilisateur en tant que manager
 */

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})

export class UtilisateurComponent implements OnInit {
  searchText: string = '';
  isUserListVisible: boolean = false;
  isUserVisible: boolean = false;
  isCreationFormVisible: boolean = false;
  hide = true;
  value = 'Clear me';
  form!: FormGroup;
  users: {
    nom: string,
    prenom: string,
    email: string,
    role: string,
    projets: {id: number; nom: string;}[],
    manager: string,
  }[] = [];
  selectedUser: string | null = null;
  projetsExistants: {
    id: number;
    nom: string;
  }[] = []
  manager: string;

  constructor(private fb: FormBuilder, private managerService: ManagerService, private router: Router) {
    let managerFromLocalStorage = localStorage.getItem('user');
    if (managerFromLocalStorage !== null) {
      this.manager = managerFromLocalStorage;
    } else {
      this.manager = "Pas de manager";
    }
    this.getAttachedUsers();
    this.getProjects();
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

  get filteredUsers(): any[] {
    return this.users.filter(user =>
      user.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  showUsers() {
    this.isUserListVisible = true;
    this.isUserVisible = false;
  }

  hideUsers() {
    this.isUserListVisible = false;
    this.isUserVisible = false;
  }

  showCreation() {
    this.isCreationFormVisible = true;
    this.isUserVisible = false;
  }

  hideCreation() {
    this.isUserVisible = false;
    this.isCreationFormVisible = false;
  }

  getProjects() {
    this.managerService.getProjects().subscribe((res) => {
      console.log('Récupérer tous les projets du manager connectés :', res);
      if (res != null) {
        this.projetsExistants = res.map((project: any) => {
          return {
            id: project.id,
            nom: project.projectName
          };
        });
      } else {
        alert("Il y a eu un problème pour récupérer les projets");
      }
    });
  }

  getAttachedUsers() {
    this.managerService.getAttachedUsers().subscribe((res) => {
      console.log('Get all users attached to the connected manager:', res);
      if (res != null) {
        this.users = res.map((user: any) => {
          return {
            nom: user.firstName,
            prenom: user.lastName,
            email: user.email,
            role: "utilisateur",
            projets: user.projects,
            manager: user.managerName
          };

        });
      } else {
        alert("Il y a eu un problème pour récupérer les utilisateurs");
      }
    });
  }

  onSubmit(): void {
    const { nom, prenom, email, motDePasse } = this.form.value;
    const projetIds = this.projetsExistants.map(projet => projet.id);
    this.managerService.createUser(email, nom, prenom, motDePasse, projetIds).subscribe((res) => {
      console.log('User created:', res);
      if (res != null) {
        this.users.push({
          nom: nom,
          prenom: prenom,
          role: "Utilisateur",
          email: email,
          projets: res.projects,
          manager: res.managerName
        });
        this.isCreationFormVisible = false;
        this.form.reset();
      } else {
        alert("Il y a eu un problème pour enregistrer l'utilisateur");
      }
    });
    alert('Utilisateur enregistré');
    this.fermer();
  }

  fermer() {
    this.router.navigate(['/utilisateur']);
  }

  findSelectedUser(): any {
    if (this.selectedUser != null) {
      return this.users.find(user => user.nom == this.selectedUser?.toString());
    }
    return null;
  }

  afficherUtilisateur() {
    this.isUserListVisible = false
    this.isUserVisible = true;
  }
}
