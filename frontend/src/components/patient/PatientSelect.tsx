import { For } from 'solid-js';

interface Option {
  value: string;
  label: string;
}

interface PatientSelectProps {
  label: string;
  value: string;
  options: Option[];
  editable?: boolean;
  onChange?: (e: Event) => void;
  required?: boolean;
}

export function PatientSelect(props: PatientSelectProps) {
  return (
    <div>
      <span class="text-slate-500 block text-xs">
        {props.label}
        {props.required && <span class="text-red-500 ml-0.5">*</span>}
      </span>
      {props.editable ? (
        <select
          class="w-full mt-1 px-3 py-2 text-sm border border-slate-300 rounded-md"
          value={props.value || ''}
          onChange={props.onChange}
        >
          <For each={props.options}>{opt => (
            <option value={opt.value}>{opt.label}</option>
          )}</For>
        </select>
      ) : (
        <span class="text-slate-900 font-medium">
          {props.options.find(o => o.value === props.value)?.label || props.value || '-'}
        </span>
      )}
    </div>
  );
}