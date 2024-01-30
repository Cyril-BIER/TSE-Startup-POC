import { Statut } from 'src/app/models/statut';

export const ENV = {
  apiUrl: 'http://localhost:8081/api',
};

const admin: Statut = {
  nom: 'Administrateur',
  nom_db: 'ROLE_ADMIN',
};
const manager: Statut = {
  nom: 'Manager',
  nom_db: 'ROLE_MANAGER',
};
const utilisateur: Statut = {
  nom: 'Utilisateur',
  nom_db: 'ROLE_USER',
};

export const STATUS = {
  admin: admin,
  manager: manager,
  utilisateur: utilisateur,
};
