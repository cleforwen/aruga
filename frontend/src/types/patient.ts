export interface Patient {
  patientId: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  suffix?: string;
  dob?: string;
  sex: string;
  civilStatus: string;
  nationality?: string;
  addressLine1?: string;
  barangay?: string;
  municipality?: string;
  province?: string;
  region?: string;
  regionCode?: string;
  provinceCode?: string;
  municipalityCode?: string;
  barangayCode?: string;
  contactMobile?: string;
  contactEmail?: string;
  emergencyContactName?: string;
  emergencyContactRel?: string;
  emergencyContactNo?: string;
  philhealthNo?: string;
  membershipCategory?: string;
  phBenefitStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

export interface PatientFormData {
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  dob: string;
  sex: string;
  civilStatus: string;
  nationality: string;
  addressLine1: string;
  barangay: string;
  municipality: string;
  province: string;
  region: string;
  regionCode: string;
  provinceCode: string;
  municipalityCode: string;
  barangayCode: string;
  contactMobile: string;
  contactEmail: string;
  emergencyContactName: string;
  emergencyContactRel: string;
  emergencyContactNo: string;
  philhealthNo: string;
}