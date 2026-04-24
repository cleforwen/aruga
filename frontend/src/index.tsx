import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import { lazy, createEffect } from 'solid-js';
import './index.css';
import { AppShell } from './App';

const Login = lazy(() => import('./routes/index'));
const Patients = lazy(() => import('./routes/patients'));

const PatientsWrapper = () => <AppShell moduleTitle="Patient Registration"><Patients /></AppShell>;

const ProtectedRoute = (props: { children: any }) => {
  const navigate = (path: string) => window.location.href = path;
  createEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  });
  return props.children;
};

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error('Root element not found');
}

render(() => (
  <Router>
    <Route path="/" component={Login} />
    <Route path="/patients" component={() => (
      <ProtectedRoute>
        <PatientsWrapper />
      </ProtectedRoute>
    )} />
  </Router>
), root!);
