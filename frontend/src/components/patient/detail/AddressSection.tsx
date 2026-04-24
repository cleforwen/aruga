import { Accessor } from 'solid-js';
import { LocationSelect } from '@/components/ui/LocationSelect';
import { PatientField } from '@/components/patient/PatientField';
import type { Patient, PatientFormData } from '@/types';
import type { PatientHandlers } from './types';

export function AddressSection(props: { patient: Patient | undefined; formData: Accessor<PatientFormData>; isEditing: boolean; handlers: PatientHandlers }) {
  const handleAddressLine1Change = (value: string) => {
    props.handlers.updateFormField('addressLine1', value);
  };
  const handleRegionChange = (code: string, name: string, isAutoResolve?: boolean) => {
    props.handlers.handleRegionChange(code, name, isAutoResolve);
  };
  const handleProvinceChange = (code: string, name: string, isAutoResolve?: boolean) => {
    props.handlers.handleProvinceChange(code, name, isAutoResolve);
  };
  const handleMunicipalityChange = (code: string, name: string, isAutoResolve?: boolean) => {
    props.handlers.handleMunicipalityChange(code, name, isAutoResolve);
  };
  const handleBarangayChange = (code: string, name: string, isAutoResolve?: boolean) => {
    props.handlers.handleBarangayChange(code, name, isAutoResolve);
  };

  return (
    <div>
      <div class="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h3 class="text-xs uppercase tracking-wide text-slate-500 font-semibold">Address</h3>
      </div>
      
      {props.isEditing ? (
        <LocationSelect
          addressLine1={props.formData().addressLine1}
          regionCode={props.formData().regionCode}
          provinceCode={props.formData().provinceCode}
          provinceName={props.formData().province}
          municipalityCode={props.formData().municipalityCode}
          municipalityName={props.formData().municipality}
          barangayCode={props.formData().barangayCode}
          barangayName={props.formData().barangay}
          onAddressLine1Change={handleAddressLine1Change}
          onRegionChange={handleRegionChange}
          onProvinceChange={handleProvinceChange}
          onMunicipalityChange={handleMunicipalityChange}
          onBarangayChange={handleBarangayChange}
        />
      ) : (
        <div class="grid grid-cols-2 gap-4 text-sm">
          <PatientField label="Address Line 1" value={props.formData().addressLine1 || props.patient?.addressLine1} />
          <PatientField label="Barangay" value={props.formData().barangay || props.patient?.barangay} />
          <PatientField label="Municipality/City" value={props.formData().municipality || props.patient?.municipality} />
          <PatientField label="Province" value={props.formData().province || props.patient?.province} />
          <PatientField label="Region" value={props.formData().region || props.patient?.regionCode} />
        </div>
      )}
    </div>
  );
}
