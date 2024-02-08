import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../services/admin.service";
import {Router} from "@angular/router";

/**
 * Composant Angular pour la gestion des managers par l'administrateur :
 *      Affichage des managers et la création d'un nouveau manager.
 */
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

  /**
   * Constructeur du composant.
   * @param fb Constructeur de formulaire
   * @param adminService Service d'administration des managers
   * @param router Service de routage
   */
  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {
    this.getAllManagers();
  }

  /** Méthode d'initialisation du composant. */
  ngOnInit(): void {
    // Initialisation du formulaire
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      motDePasse: ['', Validators.required]
    });
  }

  /** Affiche la liste des managers. */
  showManagers() {
    this.isManagerListVisible = true;
    this.isManagerVisible = false;
    this.isManagerButtonVisible = true;
  }

  /** Masque  la liste des managers. */
  hideManagers() {
    this.isManagerListVisible = false;
    this.isManagerVisible = false;
    this.isManagerButtonVisible = false;
  }

  /** Affiche le formulaire de création d'un manager. */
  showCreation() {
    this.isCreationFormVisible = true;
    this.isManagerVisible = false;
  }

  /** Masque le formulaire de création d'un manager. */
  hideCreation() {
    this.isManagerVisible = false;
    this.isCreationFormVisible = false;
  }

  /** Récupère tous les managers depuis le service. */
  getAllManagers() {
    this.adminService.getAllManagers().subscribe((res) => {
      if (res != null) {
        res.forEach((manager: { id: any; firstName: any; lastName: any; email: any; password: any; }) => {
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

  /** Soumet le formulaire de création d'un manager. */
  onSubmit(): void {
    const {nom, prenom, email, motDePasse} = this.form.value;
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
    alert('Utilisateur enregistré');
    this.fermer();
  }

  fermer() {
    this.router.navigate(['/manager']);
  }

  /** Recherche et renvoie les informations sur le manager sélectionné. */
  findSelectedManager(): any {
    if (this.selectedManager != null) {
      return this.managers.find(manager => manager.firstName == this.selectedManager?.toString());
    }
    return null;
  }

  /** Affiche les informations sur le manager sélectionné. */
  afficherManager() {
    this.isManagerListVisible = false
    this.isManagerVisible = true;
  }
}
