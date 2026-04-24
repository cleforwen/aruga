import { Accessor, For } from 'solid-js';
import { Input } from '@/components/ui/Input';
import { PatientField } from '@/components/patient/PatientField';
import type { Patient, PatientFormData } from '@/types';
import { RELATIONSHIP_OPTIONS } from '@/constants';
import type { PatientHandlers } from './types';

export function EmergencySection(props: { patient: Patient | undefined; formData: Accessor<PatientFormData>; isEditing: boolean; handlers: PatientHandlers }) {
  return (
    <div>
      <h3 class="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-3 border-b border-slate-200 pb-2">Emergency Contact</h3>
      <div class="grid grid-cols-2 gap-4 text-sm">
        {props.isEditing ? (
          <>
            <div>
              <span class="text-slate-500 block text-xs">Contact Name</span>
              <Input value={props.formData().emergencyContactName} onInput={props.handlers.handleEmergencyContactNameChange} class="mt-1" />
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Relationship</span>
              <select class="w-full mt-1 px-3 py-2 text-sm border border-slate-300 rounded-md" value={props.formData().emergencyContactRel} onChange={props.handlers.handleEmergencyContactRelChange}>
                <For each={RELATIONSHIP_OPTIONS}>{opt => <option value={opt.value}>{opt.label}</option>}</For>
              </select>
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Contact Number</span>
              <Input value={props.formData().emergencyContactNo} onInput={props.handlers.handleEmergencyContactNoChange} class="mt-1" />
            </div>
          </>
        ) : (
          <>
            <PatientField label="Contact Name" value={props.patient?.emergencyContactName} />
            <PatientField label="Relationship" value={props.patient?.emergencyContactRel} />
            <PatientField label="Contact Number" value={props.patient?.emergencyContactNo} />
          </>
        )}
      </div>
    </div>
  );
}
