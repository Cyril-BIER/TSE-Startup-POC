import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetComponent } from './projet/projet.component';
import { TempsComponent } from './temps/temps.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CompteRenduComponent } from './compte-rendu/compte-rendu.component';
import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [
  { path: '', component: ConnexionComponent },
  { path: 'projet', component: ProjetComponent },
  { path: 'temps', component: TempsComponent },
  { path: 'utilisateur', component: UtilisateurComponent },
  { path: 'compte-rendu', component: CompteRenduComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
