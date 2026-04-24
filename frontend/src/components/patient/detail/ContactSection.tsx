import { Accessor } from 'solid-js';
import { Input } from '@/components/ui/Input';
import { PatientField } from '@/components/patient/PatientField';
import type { Patient, PatientFormData } from '@/types';
import type { PatientHandlers } from './types';

export function ContactSection(props: { patient: Patient | undefined; formData: Accessor<PatientFormData>; isEditing: boolean; handlers: PatientHandlers }) {
  return (
    <div>
      <h3 class="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-3 border-b border-slate-200 pb-2">Contact Details</h3>
      <div class="grid grid-cols-2 gap-4 text-sm">
        {props.isEditing ? (
          <>
            <div>
              <span class="text-slate-500 block text-xs">Mobile Number</span>
              <Input value={props.formData().contactMobile} onInput={props.handlers.handleContactMobileChange} class="mt-1" />
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Email Address</span>
              <Input value={props.formData().contactEmail} onInput={props.handlers.handleContactEmailChange} class="mt-1" />
            </div>
          </>
        ) : (
          <>
            <PatientField label="Mobile Number" value={props.patient?.contactMobile} />
            <PatientField label="Email Address" value={props.patient?.contactEmail} />
          </>
        )}
      </div>
    </div>
  );
}
