import { createEffect, onMount, onCleanup } from 'solid-js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Instance } from 'flatpickr/dist/types/instance';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  class?: string;
  placeholder?: string;
}

export function DatePicker(props: DatePickerProps) {
  let inputRef!: HTMLInputElement;
  let fp: Instance | null = null;

  onMount(() => {
    fp = flatpickr(inputRef, {
      defaultDate: props.value,
      onChange: (selectedDates, dateStr) => {
        props.onChange(dateStr);
      },
      dateFormat: "Y-m-d",
      allowInput: true, // allows typing the date directly
    });
  });

  createEffect(() => {
    if (fp && props.value) {
      if (fp.selectedDates.length === 0 || fp.selectedDates[0].getTime() !== new Date(props.value).getTime()) {
        fp.setDate(props.value, false);
      }
    }
  });

  onCleanup(() => {
    if (fp) {
      fp.destroy();
    }
  });

  return (
    <div class="relative w-full">
      <input
        ref={inputRef}
        type="text"
        required={props.required}
        placeholder={props.placeholder || 'Select date'}
        class={`w-full px-3 py-2 text-sm border border-slate-300 rounded-md bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors ${props.class || ''}`}
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
    </div>
  );
}
