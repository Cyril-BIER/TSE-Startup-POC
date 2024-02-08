import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ManagerService} from "../services/manager.service";
import {Router} from "@angular/router";

/**
 * Composant Angular pour créer ou afficher un utilisateur en tant que manager.
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

  /**
   * Constructeur du composant.
   * @param fb Constructeur de formulaire
   * @param managerService Service de gestion des managers
   * @param router Service de routage
   */
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

  /** Méthode d'initialisation du composant */
  ngOnInit(): void {
    // Initialisation du formulaire
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      motDePasse: ['', Validators.required]
    });
  }

  /** Méthode de filtrage des utilisateurs */
  get filteredUsers(): any[] {
    return this.users.filter(user =>
      user.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  /** Affiche la liste des utilisateurs */
  showUsers() {
    this.isUserListVisible = true;
    this.isUserVisible = false;
  }

  /** Masque la liste des utilisateurs */
  hideUsers() {
    this.isUserListVisible = false;
    this.isUserVisible = false;
  }

  /** Affiche le formulaire de création d'utilisateur */
  showCreation() {
    this.isCreationFormVisible = true;
    this.isUserVisible = false;
  }

  /** Masque le formulaire de création d'utilisateur */
  hideCreation() {
    this.isUserVisible = false;
    this.isCreationFormVisible = false;
  }

  /** Récupère la liste des projets existants */
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

  /** Récupère la liste des utilisateurs attachés */
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

  /** Soumet le formulaire de création d'utilisateur */
  onSubmit(): void {
    const { nom, prenom, email, motDePasse } = this.form.value;
    const projetIds = this.projetsExistants.map(projet => projet.id);
    this.managerService.createUser(email, prenom, nom, motDePasse, projetIds).subscribe((res) => {
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

  /** Redirige vers la page de gestion d'un utilisateur */
  fermer() {
    this.router.navigate(['/utilisateur']);
  }

  /** Retourne l'utilisateur sélectionné */
  findSelectedUser(): any {
    if (this.selectedUser != null) {
      return this.users.find(user => user.nom == this.selectedUser?.toString());
    }
    return null;
  }

  /** Affiche les détails de l'utilisateur sélectionné */
  afficherUtilisateur() {
    this.isUserListVisible = false
    this.isUserVisible = true;
  }
}
