/**
 * Interface représentant un projet.
 */
export interface Projet {
  id: number;
  projectName: string;
  managerName: string;
  projectUsers: any[];
}
