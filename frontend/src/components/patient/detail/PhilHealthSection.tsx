import { Accessor } from 'solid-js';
import { Input } from '@/components/ui/Input';
import { PatientField } from '@/components/patient/PatientField';
import { PhilHealthBadge } from '@/components/patient/PhilHealthBadge';
import type { Patient, PatientFormData } from '@/types';
import type { PatientHandlers } from './types';

export function PhilHealthSection(props: { patient: Patient | undefined; formData: Accessor<PatientFormData>; isEditing: boolean; handlers: PatientHandlers }) {
  return (
    <div>
      <h3 class="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-3 border-b border-slate-200 pb-2">PhilHealth</h3>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-slate-500 block text-xs">PhilHealth PIN</span>
          {props.isEditing ? (
            <Input class="font-mono mt-1" value={props.formData().philhealthNo} onInput={props.handlers.handlePhilhealthNoChange} maxlength="12" />
          ) : (
            <span class="text-slate-900 font-mono font-medium">{props.patient?.philhealthNo || 'Not registered'}</span>
          )}
        </div>
        <PatientField label="Membership Category" value={props.patient?.membershipCategory} />
        <div>
          <span class="text-slate-500 block text-xs">Benefit Status</span>
          <PhilHealthBadge status={props.patient?.phBenefitStatus || 'PENDING'} />
        </div>
      </div>
    </div>
  );
}
