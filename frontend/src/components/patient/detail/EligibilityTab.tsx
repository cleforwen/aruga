import { Accessor, Show, For } from 'solid-js';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PhilHealthBadge } from '@/components/patient/PhilHealthBadge';
import type { EligibilityLog } from '@/types';
import { QUERY_TYPE_OPTIONS, MEMBER_STATUS_OPTIONS } from '@/constants';
import type { EligibilityHandlers } from './types';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
};

export function EligibilityTab(props: { 
  eligibilityLogs: EligibilityLog[] | undefined; 
  formData: Accessor<{ queryType: string; memberStatus: string; contributionMonths: number; benefitYear: number; remarks: string }>; 
  isAdding: boolean; 
  isSaving: boolean; 
  onAddToggle: () => void; 
  onSubmit: (e: Event) => void; 
  handlers: EligibilityHandlers 
}) {
  return (
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-sm font-semibold text-slate-900">PhilHealth Eligibility Logs</h3>
        <Button variant="outline" class="text-xs" onClick={props.onAddToggle}>+ Add Log</Button>
      </div>

      <Show when={props.isAdding}>
        <form onSubmit={props.onSubmit} class="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
          <h4 class="text-xs font-semibold text-slate-700 uppercase tracking-wide">Add New Eligibility Log</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-slate-500 block text-xs">Query Type</span>
              <select class="w-full mt-1 px-3 py-2 text-sm border border-slate-300 rounded-md" value={props.formData().queryType} onChange={props.handlers.handleQueryTypeChange}>
                <For each={QUERY_TYPE_OPTIONS}>{opt => <option value={opt.value}>{opt.label}</option>}</For>
              </select>
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Member Status</span>
              <select class="w-full mt-1 px-3 py-2 text-sm border border-slate-300 rounded-md" value={props.formData().memberStatus} onChange={props.handlers.handleMemberStatusChange}>
                <For each={MEMBER_STATUS_OPTIONS}>{opt => <option value={opt.value}>{opt.label}</option>}</For>
              </select>
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Contribution Months</span>
              <Input type="number" value={String(props.formData().contributionMonths)} onInput={props.handlers.handleContributionMonthsChange} class="mt-1" />
            </div>
            <div>
              <span class="text-slate-500 block text-xs">Benefit Year</span>
              <Input type="number" value={String(props.formData().benefitYear)} onInput={props.handlers.handleBenefitYearChange} class="mt-1" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs text-slate-600 mb-1">Remarks</label>
              <textarea class="w-full px-3 py-2 text-sm border border-slate-300 rounded-md" rows={2} value={props.formData().remarks} onInput={props.handlers.handleRemarksChange} placeholder="Optional notes..." />
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <Button type="button" variant="outline" class="text-xs" onClick={props.onAddToggle}>Cancel</Button>
            <Button type="submit" class="text-xs" disabled={props.isSaving}>Save</Button>
          </div>
        </form>
      </Show>

      <Show when={props.eligibilityLogs?.length} fallback={
        <p class="text-sm text-slate-500 text-center py-8">No eligibility logs found.</p>
      }>
        <div class="border border-slate-200 rounded-md overflow-hidden">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-3 py-2 font-medium text-slate-600">Date</th>
                <th class="px-3 py-2 font-medium text-slate-600">Query</th>
                <th class="px-3 py-2 font-medium text-slate-600">Status</th>
                <th class="px-3 py-2 font-medium text-slate-600">Months</th>
                <th class="px-3 py-2 font-medium text-slate-600">Trans. No.</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <For each={props.eligibilityLogs}>{(log) => (
                <tr>
                  <td class="px-3 py-2 text-slate-900">{formatDate(log.queryDate)}</td>
                  <td class="px-3 py-2 text-slate-600">{log.queryType}</td>
                  <td class="px-3 py-2">
                    <PhilHealthBadge status={log.memberStatus} />
                  </td>
                  <td class="px-3 py-2 text-slate-600">{log.contributionMonths}</td>
                  <td class="px-3 py-2 text-slate-500 font-mono text-xs">{log.phicTransactionNo || '-'}</td>
                </tr>
              )}</For>
            </tbody>
          </table>
        </div>
      </Show>
    </div>
  );
}
