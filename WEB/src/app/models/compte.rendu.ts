/**
 * Interface représentant un rapport de travail pour un mois donné.
 */
interface WorkTimeReport {
  [key: string]: string; // Clé : Nom du projet, Valeur : Heures effectuées
}

/**
 * Interface représentant un compte rendu mensuel de travail.
 */
export interface compteRendu {
  userId: number;
  userName: string;
  yearMonth: string;
  workTimeReport: WorkTimeReport;
}
