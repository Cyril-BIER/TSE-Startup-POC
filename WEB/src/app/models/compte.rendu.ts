interface WorkTimeReport {
  [key: string]: string; // Une clé (String) associée à une valeur (String)
}

export interface compteRendu {
  userId: number;
  userName: string;
  yearMonth: string; // Pour représenter les années et les mois, vous pouvez utiliser une chaîne ou créer une classe YearMonth
  workTimeReport: WorkTimeReport;
}
