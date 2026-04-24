import { JSX } from 'solid-js/jsx-runtime';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'secondary' };

export function Button(props: ButtonProps) {
  const { variant = 'default', class: className, ...rest } = props;
  
  const variants = {
    default: 'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-700',
    outline: 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
  };

  return (
    <button
      class={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${variants[variant]} ${className || ''}`}
      {...rest}
    />
  );
}
