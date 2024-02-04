import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ManagerService} from "../services/manager.service";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {
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
    projets: string[],
    manager: string,
  }[] = [];
  selectedUser: string | null = null;
  selectedProjet: string | null = null;

  projetsExistants: {
    nom: string;
  }[] = [
    {
      nom: "info"
    },
    {
      nom: "vision"
    },
    {
      nom: "réseau"
    }
  ]

  manager: string;

  constructor(private fb: FormBuilder, private managerService: ManagerService) {
    let managerFromLocalStorage = localStorage.getItem('user');
    if (managerFromLocalStorage !== null) {
      this.manager = managerFromLocalStorage;
    } else {
      this.manager = "Pas de manager";
    }
    this.managerService.getAttachedUsers().subscribe((res) => {
      console.log('Get all users attached to the connected manager:', res);
      if (res != null) {
        res.forEach((user: { firstName: any; lastName: any; email: any; projets: any; managerName: any; }) => {
            this.users.push({
              nom: user.firstName,
              prenom: user.lastName,
              email: user.email,
              role: 'ROLE_UTILISATEUR',
              projets: user.projets,
              manager: user.managerName
            });
          }
        )
      } else {
        alert("Il y a eu un problème pour récupérer les utilisateurs");
      }
    });
  }

  ngOnInit(): void {
    // Initialisation du formulaire
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      projets: [[], Validators.required],
      motDePasse: ['', Validators.required]
    });
  }


  get filteredUsers(): any[] {
    return this.users.filter(user =>
      user.nom.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedProjet === null || (user.projets && user.projets.some(projet => projet === this.selectedProjet)))
    );
  }

  onNgModelChange(event: any) {
    console.log('On ngModelChange : ', event);
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

  onSubmit(): void {
    const {nom, prenom, email, motDePasse} = this.form.value;
    const manager = localStorage.getItem('user');
    this.managerService.createUser(email, nom, prenom, motDePasse).subscribe((res) => {
      console.log('User created:', res);
      if (res) {
        // Projet vide à implementer plus tard
        this.users.push({
          nom: nom,
          prenom: prenom,
          role: "Utilisateur",
          email: email,
          projets: [],
          manager: this.manager
        });
        this.isCreationFormVisible = false;
        this.form.reset(); // Réinitialiser le formulaire ici
      } else {
        alert("Il y a eu un problème pour enregistrer l'utilisateur");
      }
    });
  }

  supprimerUtilisateur(): void {
    if (this.selectedUser && this.selectedUser.length > 0) {
      const selectedUserName = this.selectedUser[0]; // Prendre le premier élément du tableau
      const index = this.users.findIndex(user => user.nom === selectedUserName);
      if (index !== -1) {
        this.users.splice(index, 1);
        this.selectedUser = '';
      }
    }
  }

  findSelectedUser(): any {
    if (this.selectedUser === null) {
      return null; // Si aucun utilisateur n'est sélectionné, retourne null
    }
    // @ts-ignore // car on enlève le cas ou selectedUser== null
    return this.users.find(user => user.nom === this.selectedUser.toString());
  }

  afficherUtilisateur() {
    this.isUserListVisible = false
    this.isUserVisible = true;
  }
}
