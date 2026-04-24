export interface Dependent {
  dependentId: number;
  principalPatientId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  suffix?: string;
  dob: string;
  sex: string;
  relationship: string;
  supportingDocType: string;
  supportingDocRef?: string;
  dateRegistered: string;
  isValid: boolean;
}

export interface DependentFormData {
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  dob: string;
  sex: string;
  relationship: string;
  supportingDocType: string;
  supportingDocRef: string;
}