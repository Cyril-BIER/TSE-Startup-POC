import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetComponent } from './projet/projet.component';
import { TempsComponent } from './temps/temps.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CompteRenduComponent } from './compte-rendu/compte-rendu.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { TempsFormulaireComponent } from './temps-formulaire/temps-formulaire.component';
import { canActivate } from './services/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminmanagerComponent } from './adminmanager/adminmanager.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { ProjetFormulaireComponent } from './projet-formulaire/projet-formulaire.component';
import {CompteRenduManagerComponent} from "./compte-rendu-manager/compte-rendu-manager.component";
import {TempsListeUsersComponent} from "./temps-liste-users/temps-liste-users.component";

/**
 * Définit les routes de l'application Angular.
 */
const routes: Routes = [
  { path: '', component: ConnexionComponent },
  { path: 'projet', component: ProjetComponent, canActivate: [canActivate] },
  { path: 'temps', component: TempsComponent, canActivate: [canActivate] },
  {
    path: 'temps/:id',
    component: TempsComponent,
    canActivate: [canActivate]
  },
  {
    path: 'temps-formulaire',
    component: TempsFormulaireComponent,
    canActivate: [canActivate],
  },
  {
    path: 'temps-liste-users',
    component: TempsListeUsersComponent,
    canActivate: [canActivate],
  },
  {
    path: 'utilisateur',
    component: UtilisateurComponent,
    canActivate: [canActivate],
  },
  {
    path: 'compte-rendu',
    component: CompteRenduComponent,
    canActivate: [canActivate],
  },
  {
    path: 'compte-rendu/:id/:canAddImputation',
    component: CompteRenduComponent,
    canActivate: [canActivate],
  },
  {
    path: 'compte-rendu-manager',
    component: CompteRenduManagerComponent,
    canActivate: [canActivate],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [canActivate],
  },
  {
    path: 'manager',
    component: AdminmanagerComponent,
    canActivate: [canActivate],
  },
  {
    path: 'adminForm/:id',
    component: AdminFormComponent,
    canActivate: [canActivate],
  },
  {
    path: 'projetForm',
    component: ProjetFormulaireComponent,
    canActivate: [canActivate],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
