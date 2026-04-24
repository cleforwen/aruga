import { Input } from '@/components/ui/Input';

interface PatientFieldProps {
  label: string;
  value: string;
  editable?: boolean;
  onInput?: (e: Event) => void;
  placeholder?: string;
  required?: boolean;
}

export function PatientField(props: PatientFieldProps) {
  return (
    <div>
      <span class="text-slate-500 block text-xs">
        {props.label}
        {props.required && <span class="text-red-500 ml-0.5">*</span>}
      </span>
      {props.editable ? (
        <Input
          value={props.value || ''}
          onInput={props.onInput}
          placeholder={props.placeholder}
          class="mt-1"
        />
      ) : (
        <span class="text-slate-900 font-medium">{props.value || '-'}</span>
      )}
    </div>
  );
}