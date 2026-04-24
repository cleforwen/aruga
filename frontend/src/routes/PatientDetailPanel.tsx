import { createSignal, createResource, Show } from 'solid-js';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import type { Patient, Dependent, EligibilityLog } from '@/types';
import { usePatientForm, useDependentForm, useEligibilityForm } from '@/hooks';
import {
  DemographicsSection,
  AddressSection,
  ContactSection,
  EmergencySection,
  PhilHealthSection,
  DependentsTab,
  EligibilityTab
} from '@/components/patient/detail';

const fetchPatient = (id: string) => api.get<Patient>(`/patients/${id}`);
const fetchDependents = (id: string) => api.get<Dependent[]>(`/patients/${id}/dependents`);
const fetchEligibilityLogs = (id: string) => api.get<EligibilityLog[]>(`/patients/${id}/eligibility`);

export function PatientDetailPanel(props: { patientId: string; onClose: () => void; onRefresh: () => void }) {
  const [patient, { refetch: refetchPatient }] = createResource(() => props.patientId, fetchPatient);
  const [dependents, { refetch: refetchDependents }] = createResource(() => props.patientId, fetchDependents);
  const [eligibilityLogs, { refetch: refetchEligibility }] = createResource(() => props.patientId, fetchEligibilityLogs);

  const [activeTab, setActiveTab] = createSignal<'info' | 'dependents' | 'eligibility'>('info');
  const [isEditing, setIsEditing] = createSignal(false);
  const [isAddingDependent, setIsAddingDependent] = createSignal(false);
  const [isAddingEligibility, setIsAddingEligibility] = createSignal(false);
  const [isSaving, setIsSaving] = createSignal(false);

  const { formData, initializeForm, clearForm, handlers: patientHandlers } = usePatientForm(patient);
  const { formData: dependentForm, clearForm: clearDependentForm, handlers: dependentHandlers } = useDependentForm();
  const { formData: eligibilityForm, clearForm: clearEligibilityForm, handlers: eligibilityHandlers } = useEligibilityForm();

  const startEdit = () => {
    initializeForm();
    setIsEditing(true);
  };

  const cancelEdit = () => {
    clearForm();
    setIsEditing(false);
  };

  const savePatient = async () => {
    setIsSaving(true);
    try {
      const data = formData();
      const payload = {
        ...data,
        addressLine1: data.addressLine1 || null,
        barangay: data.barangay || null,
        municipality: data.municipality || null,
        province: data.province || null,
        region: data.region || null,
        provinceCode: data.provinceCode || null,
        municipalityCode: data.municipalityCode || null,
        barangayCode: data.barangayCode || null,
      };
      await api.put(`/patients/${props.patientId}`, payload);
      refetchPatient();
      props.onRefresh();
      setIsEditing(false);
      clearForm();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const addDependent = async (e: Event) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const depData = dependentForm();
      await api.post(`/patients/${props.patientId}/dependents`, {
        firstName: depData.firstName,
        lastName: depData.lastName,
        middleName: depData.middleName || null,
        suffix: depData.suffix || null,
        dob: depData.dob,
        sex: depData.sex,
        relationship: depData.relationship,
        supportingDocType: depData.supportingDocType,
        supportingDocRef: depData.supportingDocRef || null,
      });
      refetchDependents();
      setIsAddingDependent(false);
      clearDependentForm();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const addEligibilityLog = async (e: Event) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const eligData = eligibilityForm();
      await api.post(`/patients/${props.patientId}/eligibility`, {
        queryType: eligData.queryType,
        memberStatus: eligData.memberStatus,
        contributionMonths: eligData.contributionMonths,
        benefitYear: eligData.benefitYear,
        remarks: eligData.remarks,
        queryDate: new Date().toISOString(),
      });
      refetchEligibility();
      setIsAddingEligibility(false);
      clearEligibilityForm();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div class="fixed inset-0 bg-slate-900/50 z-50 flex justify-end">
      <div class="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col animate-slide-in">
        <Show when={patient()} fallback={
          <div class="flex-1 flex items-center justify-center">
            <span class="text-slate-500">Loading patient details...</span>
          </div>
        }>
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div>
              <h2 class="text-lg font-bold text-slate-900">
                {patient()?.lastName?.toUpperCase()}, {patient()?.firstName?.toUpperCase()}
              </h2>
              <p class="text-sm text-slate-500 font-mono">{patient()?.patientId}</p>
            </div>
            <div class="flex items-center gap-2">
              <Show when={!isEditing()}>
                <Button variant="outline" class="text-xs" onClick={startEdit}>Edit</Button>
              </Show>
              <button onClick={props.onClose} class="text-slate-400 hover:text-slate-600 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>

          <Show when={isEditing()}>
            <div class="px-6 py-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
              <span class="text-amber-800 text-sm font-medium">Editing patient record</span>
              <div class="flex gap-2">
                <Button variant="outline" class="text-xs" onClick={cancelEdit}>Cancel</Button>
                <Button class="text-xs" onClick={savePatient} disabled={isSaving()}>
                  {isSaving() ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </Show>

          <div class="flex border-b border-slate-200">
            <button onClick={() => setActiveTab('info')} class={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab() === 'info' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              Patient Info
            </button>
            <button onClick={() => setActiveTab('dependents')} class={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab() === 'dependents' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              Dependents ({dependents()?.length || 0})
            </button>
            <button onClick={() => setActiveTab('eligibility')} class={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab() === 'eligibility' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              Eligibility Logs ({eligibilityLogs()?.length || 0})
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6">
            <Show when={activeTab() === 'info'}>
              <div class="space-y-6">
                <DemographicsSection patient={patient()} formData={formData} isEditing={isEditing()} handlers={patientHandlers} />
                <AddressSection patient={patient()} formData={formData} isEditing={isEditing()} handlers={patientHandlers} />
                <ContactSection patient={patient()} formData={formData} isEditing={isEditing()} handlers={patientHandlers} />
                <EmergencySection patient={patient()} formData={formData} isEditing={isEditing()} handlers={patientHandlers} />
                <PhilHealthSection patient={patient()} formData={formData} isEditing={isEditing()} handlers={patientHandlers} />
              </div>
            </Show>

            <Show when={activeTab() === 'dependents'}>
              <DependentsTab
                dependents={dependents()}
                formData={dependentForm}
                isAdding={isAddingDependent()}
                isSaving={isSaving()}
                onAddToggle={() => setIsAddingDependent(!isAddingDependent())}
                onSubmit={addDependent}
                handlers={dependentHandlers}
              />
            </Show>

            <Show when={activeTab() === 'eligibility'}>
              <EligibilityTab
                eligibilityLogs={eligibilityLogs()}
                formData={eligibilityForm}
                isAdding={isAddingEligibility()}
                isSaving={isSaving()}
                onAddToggle={() => setIsAddingEligibility(!isAddingEligibility())}
                onSubmit={addEligibilityLog}
                handlers={eligibilityHandlers}
              />
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
}