import { Accessor, For } from 'solid-js';
import { Input } from '@/components/ui/Input';
import { DatePicker } from '@/components/ui/DatePicker';
import { PatientField } from '@/components/patient/PatientField';
import type { Patient, PatientFormData } from '@/types';
import { SEX_OPTIONS, CIVIL_STATUS_OPTIONS } from '@/constants';
import type { PatientHandlers } from './types';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
};

export function DemographicsSection(props: { patient: Patient | undefined; formData: Accessor<PatientFormData>; isEditing: boolean; handlers: PatientHandlers }) {
  return (
    <div>
      <h3 class="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-3 border-b border-slate-200 pb-2">Demographics</h3>
      <div class="grid grid-cols-2 gap-4 text-sm">
        {props.isEditing ? (
          <>
            <div>
              <span class="text-slate-500 block text-xs">First Name <span class="text-red-500">*</span></span>
              <Input value={props.formData().firstName} onInput={props.handlers.handleFirstNameChange} class="mt-1" />
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Last Name <span class="text-red-500">*</span></span>
              <Input value={props.formData().lastName} onInput={props.handlers.handleLastNameChange} class="mt-1" />
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Middle Name</span>
              <Input value={props.formData().middleName} onInput={props.handlers.handleMiddleNameChange} class="mt-1" />
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Suffix</span>
              <Input value={props.formData().suffix} onInput={props.handlers.handleSuffixChange} class="mt-1" />
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Date of Birth</span>
              <DatePicker value={props.formData().dob} onChange={props.handlers.handleDobChange} class="mt-1" />
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Sex</span>
              <select class="w-full mt-1 px-3 py-2 text-sm border border-slate-300 rounded-md" value={props.formData().sex} onChange={props.handlers.handleSexChange}>
                <For each={SEX_OPTIONS}>{opt => <option value={opt.value}>{opt.label}</option>}</For>
              </select>
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Civil Status</span>
              <select class="w-full mt-1 px-3 py-2 text-sm border border-slate-300 rounded-md" value={props.formData().civilStatus} onChange={props.handlers.handleCivilStatusChange}>
                <For each={CIVIL_STATUS_OPTIONS}>{opt => <option value={opt.value}>{opt.label}</option>}</For>
              </select>
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Nationality</span>
              <Input value={props.formData().nationality} onInput={props.handlers.handleNationalityChange} class="mt-1" />
            </div>
          </>
        ) : (
          <>
            <PatientField label="First Name" value={props.patient?.firstName} />
            <PatientField label="Last Name" value={props.patient?.lastName} />
            <PatientField label="Middle Name" value={props.patient?.middleName} />
            <PatientField label="Suffix" value={props.patient?.suffix} />
            <PatientField label="Date of Birth" value={formatDate(props.patient?.dob || '')} />
            <PatientField label="Sex" value={props.patient?.sex} />
            <PatientField label="Civil Status" value={props.patient?.civilStatus} />
            <PatientField label="Nationality" value={props.patient?.nationality} />
          </>
        )}
      </div>
    </div>
  );
}
