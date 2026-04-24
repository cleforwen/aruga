import { createSignal, onMount, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function Login() {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [errorMsg, setErrorMsg] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  const navigate = useNavigate();

  onMount(() => {
    if (localStorage.getItem('token')) {
      navigate('/patients');
    }
  });

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const data = await api.post('/auth/login', { username: username(), password: password() });
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/patients');
      }
    } catch (e) {
      setErrorMsg((e as any).message || 'Invalid credentials or system offline.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 font-sans">
      <div class="w-full max-w-md">
        {/* Header */}
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-xl shadow-lg shadow-teal-600/20 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.056-9.054l.26-1.477m0 0a3 3 0 10-4.243-3.176 3 3 0 004.243 3.176z" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white tracking-tight">
            ARUGA <span class="text-teal-400">HMS</span>
          </h1>
          <p class="mt-2 text-sm text-slate-400">Hospital Management System</p>
        </div>

        {/* Login Card */}
        <div class="bg-white rounded-xl shadow-2xl p-8">
          <div class="mb-6">
            <h2 class="text-lg font-semibold text-slate-900">Welcome back</h2>
            <p class="text-sm text-slate-500 mt-1">Enter your credentials to access the system</p>
          </div>

          <Show when={errorMsg()}>
            <div class="mb-6 bg-red-50 border border-red-100 rounded-lg p-4">
              <div class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-red-700">{errorMsg()}</p>
              </div>
            </div>
          </Show>

          <form class="space-y-5" onSubmit={handleLogin}>
            <div>
              <label for="username" class="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
              <Input 
                id="username" 
                type="text" 
                required 
                placeholder="Enter your username"
                value={username()} 
                onInput={e => setUsername(e.currentTarget.value)} 
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <Input 
                id="password" 
                type="password" 
                required 
                placeholder="Enter your password"
                value={password()} 
                onInput={e => setPassword(e.currentTarget.value)} 
              />
            </div>

            <Button 
              type="submit" 
              class="w-full h-11 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-medium rounded-lg transition-colors"
              disabled={isLoading()}
            >
              {isLoading() ? (
                <span class="inline-flex items-center gap-2">
                  <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div class="mt-6 text-center">
          <p class="text-xs text-slate-500">Authorized personnel only • v2.0.0</p>
        </div>
      </div>
    </div>
  );
}