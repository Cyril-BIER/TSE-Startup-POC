interface WorkTimeReport {
  [key: string]: string;
}

export interface compteRendu {
  userId: number;
  userName: string;
  yearMonth: string;
  workTimeReport: WorkTimeReport;
}
