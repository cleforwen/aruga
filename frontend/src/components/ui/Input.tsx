import { JSX } from 'solid-js/jsx-runtime';

export function Input(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
  const { class: className, ...rest } = props;
  return (
    <input
      class={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${className || ''}`}
      {...rest}
    />
  );
}
