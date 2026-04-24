import { Route, useNavigate } from '@solidjs/router';
import { lazy } from 'solid-js';

const Login = lazy(() => import('./routes/index'));
const Patients = lazy(() => import('./routes/patients'));

export const AppShell = (props: { children: any; moduleTitle: string }) => {
  const navigate = useNavigate();
  return (
    <div class="min-h-screen bg-slate-50 flex font-sans">
      <aside class="w-56 bg-slate-900 text-white fixed h-screen z-40 flex flex-col shadow-xl">
        <div class="h-14 flex flex-col justify-center px-4 border-b border-slate-800">
          <span class="font-semibold text-sm tracking-wide text-white">ARUGA</span>
          <span class="text-slate-400 text-xs font-mono">v2.0 • Enterprise HMS</span>
        </div>
        <nav class="flex-1 py-4 flex flex-col gap-1">
          <a href="/patients" class={`rounded-md mx-2 px-3 py-2 text-sm flex items-center ${props.moduleTitle === 'Patient Registration' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <span class={`mr-3 ${props.moduleTitle === 'Patient Registration' ? 'text-white' : 'text-slate-400'}`}>🏥</span> Patient Registration
          </a>
          {/*
          <a href="#" class="text-slate-400 hover:text-white hover:bg-slate-800 rounded-md mx-2 px-3 py-2 text-sm flex items-center">
            <span class="text-slate-400 mr-3">🛏️</span> Admission
          </a>
          <a href="#" class="text-slate-400 hover:text-white hover:bg-slate-800 rounded-md mx-2 px-3 py-2 text-sm flex items-center">
            <span class="text-slate-400 mr-3">🩺</span> OPD
          </a>
          <a href="#" class="text-slate-400 hover:text-white hover:bg-slate-800 rounded-md mx-2 px-3 py-2 text-sm flex items-center">
            <span class="text-slate-400 mr-3">💳</span> Billing
          </a>
          <div class="border-t border-slate-800 my-2"></div>
          <a href="#" class="text-slate-400 hover:text-white hover:bg-slate-800 rounded-md mx-2 px-3 py-2 text-sm flex items-center">
            <span class="text-slate-400 mr-3">📋</span> Audit Trail
          </a>
          */}
        </nav>
        <div class="p-4 border-t border-slate-800">
          <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} class="text-slate-400 hover:text-red-400 text-sm font-medium w-full text-left flex items-center">
             Sign out
          </button>
        </div>
      </aside>

      <div class="ml-56 flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header class="h-14 bg-white border-b border-slate-200 fixed w-[calc(100%-14rem)] z-30 flex items-center px-8 justify-between shadow-xs">
          <div class="font-semibold text-slate-900 text-sm flex items-center gap-2">
            <span class="text-slate-600 font-normal">{props.moduleTitle}</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200 font-semibold text-xs shadow-xs">AD</div>
            <div class="text-xs">
              <div class="font-semibold text-slate-800 leading-tight">Admin User</div>
              <div class="text-amber-700 font-medium tracking-tight bg-amber-50 px-1 rounded border border-amber-200 inline-block mt-0.5">SUPERVISOR</div>
            </div>
          </div>
        </header>

        <main class="mt-14 flex-1 overflow-y-auto bg-slate-50 p-8">
          {props.children}
        </main>
      </div>
    </div>
  );
};
export default AppShell;
