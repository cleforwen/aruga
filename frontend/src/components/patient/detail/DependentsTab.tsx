import { Accessor, Show, For } from 'solid-js';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DatePicker } from '@/components/ui/DatePicker';
import type { Dependent } from '@/types';
import { SEX_OPTIONS, RELATIONSHIP_OPTIONS, SUPPORTING_DOC_TYPES } from '@/constants';
import type { DependentHandlers } from './types';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
};

export function DependentsTab(props: { 
  dependents: Dependent[] | undefined; 
  formData: Accessor<{ firstName: string; lastName: string; middleName: string; suffix: string; dob: string; sex: string; relationship: string; supportingDocType: string; supportingDocRef: string }>; 
  isAdding: boolean; 
  isSaving: boolean; 
  onAddToggle: () => void; 
  onSubmit: (e: Event) => void; 
  handlers: DependentHandlers 
}) {
  return (
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-sm font-semibold text-slate-900">Patient Dependents</h3>
        <Button variant="outline" class="text-xs" onClick={props.onAddToggle}>+ Add Dependent</Button>
      </div>

      <Show when={props.isAdding}>
        <form onSubmit={props.onSubmit} class="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
          <h4 class="text-xs font-semibold text-slate-700 uppercase tracking-wide">Add New Dependent</h4>
          <div class="grid grid-cols-2 gap-4">
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
              <Input value={props.formData().suffix} onInput={props.handlers.handleSuffixChange} class="mt-1" placeholder="Jr., Sr., III…" />
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Date of Birth <span class="text-red-500">*</span></span>
              <DatePicker value={props.formData().dob} onChange={props.handlers.handleDobChange} class="mt-1" />
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Sex <span class="text-red-500">*</span></span>
              <select class="w-full mt-1 px-3 py-2 text-sm border border-slate-300 rounded-md" value={props.formData().sex} onChange={props.handlers.handleSexChange}>
                <For each={SEX_OPTIONS}>{opt => <option value={opt.value}>{opt.label}</option>}</For>
              </select>
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Relationship <span class="text-red-500">*</span></span>
              <select class="w-full mt-1 px-3 py-2 text-sm border border-slate-300 rounded-md" value={props.formData().relationship} onChange={props.handlers.handleRelationshipChange}>
                <For each={RELATIONSHIP_OPTIONS}>{opt => <option value={opt.value}>{opt.label}</option>}</For>
              </select>
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Supporting Doc Type <span class="text-red-500">*</span></span>
              <select class="w-full mt-1 px-3 py-2 text-sm border border-slate-300 rounded-md" value={props.formData().supportingDocType} onChange={props.handlers.handleSupportingDocTypeChange}>
                <For each={SUPPORTING_DOC_TYPES}>{opt => <option value={opt.value}>{opt.label}</option>}</For>
              </select>
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Doc Reference No.</span>
              <Input value={props.formData().supportingDocRef} onInput={props.handlers.handleSupportingDocRefChange} class="mt-1" />
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <Button type="button" variant="outline" class="text-xs" onClick={props.onAddToggle}>Cancel</Button>
            <Button type="submit" class="text-xs" disabled={props.isSaving}>Save</Button>
          </div>
        </form>
      </Show>

      <Show when={props.dependents?.length} fallback={
        <p class="text-sm text-slate-500 text-center py-8">No dependents registered.</p>
      }>
        <div class="border border-slate-200 rounded-md overflow-hidden">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-3 py-2 font-medium text-slate-600">Name</th>
                <th class="px-3 py-2 font-medium text-slate-600">DOB</th>
                <th class="px-3 py-2 font-medium text-slate-600">Sex</th>
                <th class="px-3 py-2 font-medium text-slate-600">Relationship</th>
                <th class="px-3 py-2 font-medium text-slate-600">Doc Type</th>
                <th class="px-3 py-2 font-medium text-slate-600">Valid</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <For each={props.dependents}>{(dep) => (
                <tr>
                  <td class="px-3 py-2 text-slate-900 font-medium">
                    {dep.lastName?.toUpperCase()}, {dep.firstName}
                    {dep.suffix ? ` ${dep.suffix}` : ''}
                  </td>
                  <td class="px-3 py-2 text-slate-600">{formatDate(dep.dob)}</td>
                  <td class="px-3 py-2 text-slate-600">{dep.sex === 'M' ? 'Male' : 'Female'}</td>
                  <td class="px-3 py-2 text-slate-900">{dep.relationship}</td>
                  <td class="px-3 py-2 text-slate-600">{dep.supportingDocType}</td>
                  <td class="px-3 py-2">
                    <span class={`px-2 py-0.5 text-xs rounded-full ${dep.isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {dep.isValid ? 'Valid' : 'Invalid'}
                    </span>
                  </td>
                </tr>
              )}</For>
            </tbody>
          </table>
        </div>
      </Show>
    </div>
  );
}
