import { createSignal, Accessor } from 'solid-js';
import { Patient, PatientFormData } from '@/types';

export function usePatientForm(patient: Accessor<Patient | undefined>) {
const [formData, setFormData] = createSignal<PatientFormData>({
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: '',
    dob: '',
    sex: 'M',
    civilStatus: 'SINGLE',
    nationality: 'Filipino',
    addressLine1: '',
    barangay: '',
    municipality: '',
    province: '',
    region: '',
    regionCode: '',
    provinceCode: '',
    municipalityCode: '',
    barangayCode: '',
    contactMobile: '',
    contactEmail: '',
    emergencyContactName: '',
    emergencyContactRel: 'Parent',
    emergencyContactNo: '',
    philhealthNo: '',
  });

  const updateFormField = (field: keyof PatientFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const initializeForm = () => {
    const p = patient();
    if (p) {
      setFormData({
        firstName: p.firstName || '',
        lastName: p.lastName || '',
        middleName: p.middleName || '',
        suffix: p.suffix || '',
        dob: p.dob || '',
        sex: p.sex || 'M',
        civilStatus: p.civilStatus || 'SINGLE',
        nationality: p.nationality || 'Filipino',
        addressLine1: p.addressLine1 || '',
        barangay: p.barangay || '',
        municipality: p.municipality || '',
        province: p.province || '',
        region: p.region || '',
        regionCode: p.regionCode || '',
        provinceCode: p.provinceCode || '',
        municipalityCode: p.municipalityCode || '',
        barangayCode: p.barangayCode || '',
        contactMobile: p.contactMobile || '',
        contactEmail: p.contactEmail || '',
        emergencyContactName: p.emergencyContactName || '',
        emergencyContactRel: p.emergencyContactRel || 'Parent',
        emergencyContactNo: p.emergencyContactNo || '',
        philhealthNo: p.philhealthNo || '',
      });
    }
  };

  const clearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      middleName: '',
      suffix: '',
      dob: '',
      sex: 'M',
      civilStatus: 'SINGLE',
      nationality: 'Filipino',
      addressLine1: '',
      barangay: '',
      municipality: '',
      province: '',
      region: '',
      regionCode: '',
      provinceCode: '',
      municipalityCode: '',
      barangayCode: '',
      contactMobile: '',
      contactEmail: '',
      emergencyContactName: '',
      emergencyContactRel: 'Parent',
      emergencyContactNo: '',
      philhealthNo: '',
    });
  };

  const handleFirstNameChange = (e: Event) => updateFormField('firstName', (e.target as HTMLInputElement).value);
  const handleLastNameChange = (e: Event) => updateFormField('lastName', (e.target as HTMLInputElement).value);
  const handleMiddleNameChange = (e: Event) => updateFormField('middleName', (e.target as HTMLInputElement).value);
  const handleSuffixChange = (e: Event) => updateFormField('suffix', (e.target as HTMLInputElement).value);
  const handleNationalityChange = (e: Event) => updateFormField('nationality', (e.target as HTMLInputElement).value);
  const handleAddressLine1Change = (e: Event) => updateFormField('addressLine1', (e.target as HTMLInputElement).value);
  const handleContactMobileChange = (e: Event) => updateFormField('contactMobile', (e.target as HTMLInputElement).value);
  const handleContactEmailChange = (e: Event) => updateFormField('contactEmail', (e.target as HTMLInputElement).value);
  const handleEmergencyContactNameChange = (e: Event) => updateFormField('emergencyContactName', (e.target as HTMLInputElement).value);
  const handleEmergencyContactNoChange = (e: Event) => updateFormField('emergencyContactNo', (e.target as HTMLInputElement).value);
  const handlePhilhealthNoChange = (e: Event) => updateFormField('philhealthNo', (e.target as HTMLInputElement).value.replace(/\D/g, '').substring(0, 12));
  const handleDobChange = (value: string) => updateFormField('dob', value);
  const handleSexChange = (e: Event) => updateFormField('sex', (e.target as HTMLSelectElement).value);
  const handleCivilStatusChange = (e: Event) => updateFormField('civilStatus', (e.target as HTMLSelectElement).value);
  const handleEmergencyContactRelChange = (e: Event) => updateFormField('emergencyContactRel', (e.target as HTMLSelectElement).value);
  const handleRegionChange = (code: string, name: string, isAutoResolve: boolean = false) => {
    setFormData(prev => ({
      ...prev,
      region: name,
      regionCode: code,
      ...(isAutoResolve ? {} : {
        province: '',
        provinceCode: '',
        municipality: '',
        municipalityCode: '',
        barangay: '',
        barangayCode: '',
      })
    }));
  };
  const handleProvinceChange = (code: string, name: string, isAutoResolve: boolean = false) => {
    setFormData(prev => ({
      ...prev,
      province: name,
      provinceCode: code,
      ...(isAutoResolve ? {} : {
        municipality: '',
        municipalityCode: '',
        barangay: '',
        barangayCode: '',
      })
    }));
  };
  const handleMunicipalityChange = (code: string, name: string, isAutoResolve: boolean = false) => {
    setFormData(prev => ({
      ...prev,
      municipality: name,
      municipalityCode: code,
      ...(isAutoResolve ? {} : {
        barangay: '',
        barangayCode: '',
      })
    }));
  };
  const handleBarangayChange = (code: string, name: string) => {
    updateFormField('barangay', name);
    updateFormField('barangayCode', code);
  };

  return {
    formData,
    setFormData,
    initializeForm,
    clearForm,
    updateFormField,
    handlers: {
      handleFirstNameChange,
      handleLastNameChange,
      handleMiddleNameChange,
      handleSuffixChange,
      handleNationalityChange,
      handleAddressLine1Change,
      handleContactMobileChange,
      handleContactEmailChange,
      handleEmergencyContactNameChange,
      handleEmergencyContactNoChange,
      handlePhilhealthNoChange,
      handleDobChange,
      handleSexChange,
      handleCivilStatusChange,
      handleEmergencyContactRelChange,
      handleRegionChange,
      handleProvinceChange,
      handleMunicipalityChange,
      handleBarangayChange,
    },
  };
}