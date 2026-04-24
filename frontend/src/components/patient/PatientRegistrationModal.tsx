import { createSignal, Show, For } from 'solid-js';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DatePicker } from '@/components/ui/DatePicker';
import { LocationSelect } from '@/components/ui/LocationSelect';
import { CIVIL_STATUS_OPTIONS, SEX_OPTIONS } from '@/constants';

interface PatientRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (patientData: any) => Promise<void>;
  isSaving: boolean;
}

export function PatientRegistrationModal(props: PatientRegistrationModalProps) {
  const [firstName, setFirstName] = createSignal('');
  const [lastName, setLastName] = createSignal('');
  const [dob, setDob] = createSignal('1990-01-01');
  const [sex, setSex] = createSignal('M');
  const [civilStatus, setCivilStatus] = createSignal('SINGLE');
  const [philhealthNo, setPhilhealthNo] = createSignal('');

  const [regionCode, setRegionCode] = createSignal('');
  const [provinceCode, setProvinceCode] = createSignal('');
  const [municipalityCode, setMunicipalityCode] = createSignal('');
  const [barangayCode, setBarangayCode] = createSignal('');
  const [addressLine1, setAddressLine1] = createSignal('');
  const [barangay, setBarangay] = createSignal('');
  const [municipality, setMunicipality] = createSignal('');
  const [province, setProvince] = createSignal('');

  const handleFirstNameChange = (e: Event) => setFirstName((e.target as HTMLInputElement).value);
  const handleLastNameChange = (e: Event) => setLastName((e.target as HTMLInputElement).value);
  const handleDobChange = (value: string) => setDob(value);
  const handleSexChange = (e: Event) => setSex((e.target as HTMLSelectElement).value);
  const handleCivilStatusChange = (e: Event) => setCivilStatus((e.target as HTMLSelectElement).value);
  const handlePhilhealthNoChange = (e: Event) => setPhilhealthNo((e.target as HTMLInputElement).value.replace(/\D/g, '').substring(0, 12));

  const handleRegionChange = (_code: string, name: string) => {
    setRegionCode(_code);
    setProvinceCode('');
    setMunicipalityCode('');
    setBarangayCode('');
    setBarangay('');
    setMunicipality('');
    setProvince('');
  };
  const handleProvinceChange = (_code: string, name: string) => {
    setProvinceCode(_code);
    setMunicipalityCode('');
    setBarangayCode('');
    setBarangay('');
    setMunicipality('');
    setProvince(name);
  };
  const handleMunicipalityChange = (_code: string, name: string) => {
    setMunicipalityCode(_code);
    setBarangayCode('');
    setBarangay('');
    setMunicipality(name);
  };
  const handleBarangayChange = (_code: string, name: string) => {
    setBarangayCode(_code);
    setBarangay(name);
  };
  const handleAddressLine1Change = (value: string) => setAddressLine1(value);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setDob('1990-01-01');
    setSex('M');
    setCivilStatus('SINGLE');
    setPhilhealthNo('');
    setRegionCode('');
    setProvinceCode('');
    setMunicipalityCode('');
    setBarangayCode('');
    setAddressLine1('');
    setBarangay('');
    setMunicipality('');
    setProvince('');
  };

  const handleClose = () => {
    resetForm();
    props.onClose();
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    await props.onRegister({
      firstName: firstName(),
      lastName: lastName(),
      dob: dob(),
      sex: sex(),
      civilStatus: civilStatus(),
      philhealthNo: philhealthNo() || null,
      addressLine1: addressLine1() || null,
      barangay: barangay() || null,
      municipality: municipality() || null,
      province: province() || null,
      regionCode: regionCode() || null,
      provinceCode: provinceCode() || null,
      municipalityCode: municipalityCode() || null,
      barangayCode: barangayCode() || null,
      createdBy: 1
    });
    resetForm();
  };

  return (
    <Show when={props.isOpen}>
      <div class="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-lg flex flex-col max-h-[90vh]">
          <div class="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-slate-900">Register New Patient</h3>
            <button onClick={handleClose} class="text-slate-400 hover:text-slate-600">✕</button>
          </div>
          <div class="p-6 overflow-y-auto flex-1">
            <form id="regForm" onSubmit={handleSubmit} class="flex flex-col gap-4">
              <div>
                <h4 class="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-3 border-b border-slate-200 pb-2">Demographics</h4>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">First Name <span class="text-red-500 ml-0.5">*</span></label>
                    <Input required placeholder="Juan" value={firstName()} onInput={handleFirstNameChange} />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Last Name <span class="text-red-500 ml-0.5">*</span></label>
                    <Input required placeholder="Dela Cruz" value={lastName()} onInput={handleLastNameChange} />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Date of Birth <span class="text-red-500 ml-0.5">*</span></label>
                    <DatePicker value={dob()} onChange={handleDobChange} required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Sex <span class="text-red-500 ml-0.5">*</span></label>
                    <select class="w-full px-3 py-2 text-sm border border-slate-300 rounded-md" value={sex()} onChange={handleSexChange}>
                      <For each={SEX_OPTIONS}>{opt => <option value={opt.value}>{opt.label}</option>}</For>
                    </select>
                  </div>
                  <div class="col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-1">Civil Status <span class="text-red-500 ml-0.5">*</span></label>
                    <select class="w-full px-3 py-2 text-sm border border-slate-300 rounded-md" value={civilStatus()} onChange={handleCivilStatusChange}>
                      <For each={CIVIL_STATUS_OPTIONS}>{opt => <option value={opt.value}>{opt.label}</option>}</For>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-3 border-b border-slate-200 pb-2">Address</h4>
                <LocationSelect
                  addressLine1={addressLine1()}
                  regionCode={regionCode()}
                  provinceCode={provinceCode()}
                  municipalityCode={municipalityCode()}
                  barangayCode={barangayCode()}
                  onAddressLine1Change={handleAddressLine1Change}
                  onRegionChange={handleRegionChange}
                  onProvinceChange={handleProvinceChange}
                  onMunicipalityChange={handleMunicipalityChange}
                  onBarangayChange={handleBarangayChange}
                />
              </div>
              
              <div>
                <h4 class="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-3 border-b border-slate-200 pb-2">PhilHealth</h4>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">PhilHealth PIN</label>
                  <Input class="font-mono tracking-widest" placeholder="0000 0000 0000" value={philhealthNo()} onInput={handlePhilhealthNoChange} maxlength="12" />
                  <p class="text-xs text-slate-400 mt-1">Enter 12 digits directly. Omit dashes.</p>
                </div>
                <Show when={!philhealthNo()}>
                  <div class="mt-3 bg-amber-50 border border-amber-200 p-3 rounded-md flex items-start gap-2">
                    <span class="text-amber-800 text-sm font-medium">No PhilHealth PIN on file. Patient tagged for post-service verification (BR-PAT-001).</span>
                  </div>
                </Show>
              </div>
            </form>
          </div>
          <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 rounded-b-lg">
            <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="regForm" disabled={props.isSaving}>
              {props.isSaving ? 'Saving...' : 'Register Patient'}
            </Button>
          </div>
        </div>
      </div>
    </Show>
  );
}
