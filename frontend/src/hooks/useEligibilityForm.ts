import { createSignal } from 'solid-js';
import { EligibilityFormData } from '@/types';

export function useEligibilityForm() {
  const [formData, setFormData] = createSignal<EligibilityFormData>({
    queryType: 'OPT',
    memberStatus: 'ACTIVE',
    contributionMonths: 3,
    benefitYear: new Date().getFullYear(),
    remarks: '',
  });

  const updateFormField = (field: keyof EligibilityFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData({
      queryType: 'OPT',
      memberStatus: 'ACTIVE',
      contributionMonths: 3,
      benefitYear: new Date().getFullYear(),
      remarks: '',
    });
  };

  const handleQueryTypeChange = (e: Event) => updateFormField('queryType', (e.target as HTMLSelectElement).value);
  const handleMemberStatusChange = (e: Event) => updateFormField('memberStatus', (e.target as HTMLSelectElement).value);
  const handleContributionMonthsChange = (e: Event) => updateFormField('contributionMonths', parseInt(e.currentTarget.value) || 0);
  const handleBenefitYearChange = (e: Event) => updateFormField('benefitYear', parseInt(e.currentTarget.value) || new Date().getFullYear());
  const handleRemarksChange = (e: Event) => updateFormField('remarks', e.currentTarget.value);

  return {
    formData,
    setFormData,
    clearForm,
    updateFormField,
    handlers: {
      handleQueryTypeChange,
      handleMemberStatusChange,
      handleContributionMonthsChange,
      handleBenefitYearChange,
      handleRemarksChange,
    },
  };
}