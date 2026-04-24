export type PatientHandlers = {
  handleFirstNameChange: (e: Event) => void;
  handleLastNameChange: (e: Event) => void;
  handleMiddleNameChange: (e: Event) => void;
  handleSuffixChange: (e: Event) => void;
  handleNationalityChange: (e: Event) => void;
  handleAddressLine1Change: (e: Event) => void;
  handleContactMobileChange: (e: Event) => void;
  handleContactEmailChange: (e: Event) => void;
  handleEmergencyContactNameChange: (e: Event) => void;
  handleEmergencyContactNoChange: (e: Event) => void;
  handlePhilhealthNoChange: (e: Event) => void;
  handleDobChange: (value: string) => void;
  handleSexChange: (e: Event) => void;
  handleCivilStatusChange: (e: Event) => void;
  handleEmergencyContactRelChange: (e: Event) => void;
  handleRegionChange: (code: string, name: string, isAutoResolve?: boolean) => void;
  handleProvinceChange: (code: string, name: string, isAutoResolve?: boolean) => void;
  handleMunicipalityChange: (code: string, name: string, isAutoResolve?: boolean) => void;
  handleBarangayChange: (code: string, name: string, isAutoResolve?: boolean) => void;
  updateFormField: (field: any, value: any) => void;
};

export type DependentHandlers = {
  handleFirstNameChange: (e: Event) => void;
  handleLastNameChange: (e: Event) => void;
  handleMiddleNameChange: (e: Event) => void;
  handleSuffixChange: (e: Event) => void;
  handleDobChange: (value: string) => void;
  handleSexChange: (e: Event) => void;
  handleRelationshipChange: (e: Event) => void;
  handleSupportingDocTypeChange: (e: Event) => void;
  handleSupportingDocRefChange: (e: Event) => void;
};

export type EligibilityHandlers = {
  handleQueryTypeChange: (e: Event) => void;
  handleMemberStatusChange: (e: Event) => void;
  handleContributionMonthsChange: (e: Event) => void;
  handleBenefitYearChange: (e: Event) => void;
  handleRemarksChange: (e: Event) => void;
};
