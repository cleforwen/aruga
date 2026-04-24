import { createSignal } from 'solid-js';
import { DependentFormData } from '@/types';

export function useDependentForm() {
  const [formData, setFormData] = createSignal<DependentFormData>({
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: '',
    dob: '',
    sex: 'M',
    relationship: 'Spouse',
    supportingDocType: 'PSA',
    supportingDocRef: '',
  });

  const updateFormField = (field: keyof DependentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      middleName: '',
      suffix: '',
      dob: '',
      sex: 'M',
      relationship: 'Spouse',
      supportingDocType: 'PSA',
      supportingDocRef: '',
    });
  };

  const handleFirstNameChange = (e: Event) => updateFormField('firstName', (e.target as HTMLInputElement).value);
  const handleLastNameChange = (e: Event) => updateFormField('lastName', (e.target as HTMLInputElement).value);
  const handleMiddleNameChange = (e: Event) => updateFormField('middleName', (e.target as HTMLInputElement).value);
  const handleSuffixChange = (e: Event) => updateFormField('suffix', (e.target as HTMLInputElement).value);
  const handleDobChange = (value: string) => updateFormField('dob', value);
  const handleSexChange = (e: Event) => updateFormField('sex', (e.target as HTMLSelectElement).value);
  const handleRelationshipChange = (e: Event) => updateFormField('relationship', (e.target as HTMLSelectElement).value);
  const handleSupportingDocTypeChange = (e: Event) => updateFormField('supportingDocType', (e.target as HTMLSelectElement).value);
  const handleSupportingDocRefChange = (e: Event) => updateFormField('supportingDocRef', (e.target as HTMLInputElement).value);

  return {
    formData,
    setFormData,
    clearForm,
    updateFormField,
    handlers: {
      handleFirstNameChange,
      handleLastNameChange,
      handleMiddleNameChange,
      handleSuffixChange,
      handleDobChange,
      handleSexChange,
      handleRelationshipChange,
      handleSupportingDocTypeChange,
      handleSupportingDocRefChange,
    },
  };
}