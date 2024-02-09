/**
 * Interface représentant une imputation dans un compte rendu.
 */
export interface ImputationCompteRendu {
  id: number;
  nom: string;
  date: string;
  heures: number;
  isEditing?: boolean;
}
