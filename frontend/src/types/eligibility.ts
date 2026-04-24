export interface EligibilityLog {
  logId: number;
  patientId: string;
  queryType: string;
  memberStatus: string;
  contributionMonths: number;
  benefitYear: number;
  queryDate: string;
  phicTransactionNo?: string;
  remarks?: string;
}

export interface EligibilityFormData {
  queryType: string;
  memberStatus: string;
  contributionMonths: number;
  benefitYear: number;
  remarks: string;
}