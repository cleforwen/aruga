import { createSignal, createResource, Suspense, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PatientRegistrationModal } from '@/components/patient/PatientRegistrationModal';
import { PhilHealthBadge } from '@/components/patient/PhilHealthBadge';
import { PatientDetailPanel } from './PatientDetailPanel';

const fetchPatients = async () => api.get('/patients');

export default function Patients() {
    const navigate = useNavigate();
    
    if (!localStorage.getItem('token')) {
        navigate('/');
    }

    const [patients, { refetch }] = createResource<any[]>(fetchPatients);
    const [isRegisterOpen, setIsRegisterOpen] = createSignal(false);
    const [selectedPatientId, setSelectedPatientId] = createSignal<string | null>(null);
    const [isSaving, setIsSaving] = createSignal(false);

    const registerPatient = async (patientData: any) => {
        setIsSaving(true);
        try {
            const newPatient = await api.post('/patients', patientData);
            setIsRegisterOpen(false);
            setSelectedPatientId(newPatient.patientId || newPatient.id);
            refetch();
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div class="flex flex-col gap-6 font-sans max-w-7xl mx-auto pb-10">
            <PatientRegistrationModal
                isOpen={isRegisterOpen()}
                onClose={() => setIsRegisterOpen(false)}
                onRegister={registerPatient}
                isSaving={isSaving()}
            />

            <Show when={selectedPatientId()}>
                <PatientDetailPanel 
                    patientId={selectedPatientId()!} 
                    onClose={() => setSelectedPatientId(null)} 
                    onRefresh={refetch}
                />
            </Show>

            <div class="bg-white text-slate-900 shadow-sm border border-slate-200 rounded-lg p-6">
                <div class="flex flex-col gap-2 mb-6">
                    <h2 class="text-2xl font-bold tracking-tight text-slate-900">Patient Directory</h2>
                    <p class="text-slate-600 text-sm">Manage patient demographics, verify PhilHealth eligibility, and review records securely.</p>
                </div>
                
                <div class="flex justify-between items-center mb-6">
                    <div class="flex w-full max-w-sm relative">
                        <Input type="text" placeholder="Search by name or PhilHealth PIN..." class="pl-10" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-3 text-slate-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                    <Button onClick={() => setIsRegisterOpen(true)}>
                        + Register New Patient
                    </Button>
                </div>

                <div class="border border-slate-200 rounded-md overflow-hidden bg-white">
                    <table class="w-full text-left">
                        <thead class="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="h-12 px-4 align-middle text-xs uppercase tracking-wide text-slate-500 font-semibold w-32">Patient ID</th>
                                <th class="h-12 px-4 align-middle text-xs uppercase tracking-wide text-slate-500 font-semibold">Name</th>
                                <th class="h-12 px-4 align-middle text-xs uppercase tracking-wide text-slate-500 font-semibold w-28">DOB</th>
                                <th class="h-12 px-4 align-middle text-xs uppercase tracking-wide text-slate-500 font-semibold w-40">PhilHealth</th>
                                <th class="h-12 px-4 align-middle text-xs uppercase tracking-wide text-slate-500 font-semibold w-32 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200">
                            <Suspense fallback={<tr><td colSpan={5} class="text-center p-8 text-slate-500">Loading clinical records...</td></tr>}>
                                <Show when={patients()?.length} fallback={<tr><td colSpan={5} class="text-center p-8 text-slate-500">No records found.</td></tr>}>
                                    {patients()?.map(p => (
                                        <tr class="hover:bg-slate-50 cursor-pointer group">
                                            <td class="px-4 py-3 align-middle font-mono text-xs text-slate-500">
                                                {p.patientId || p.id}
                                            </td>
                                            <td class="px-4 py-3 align-middle text-sm font-medium text-slate-900 group-hover:text-brand-600 transition-colors">
                                                {p.lastName?.toUpperCase()}, {p.firstName?.toUpperCase()}
                                            </td>
                                            <td class="px-4 py-3 align-middle text-sm text-slate-600 whitespace-nowrap">
                                                {p.dob || '01/01/1990'}
                                            </td>
                                            <td class="px-4 py-3 align-middle whitespace-nowrap">
                                                <PhilHealthBadge status={p.phBenefitStatus} />
                                            </td>
                                            <td class="px-4 py-3 align-middle text-right">
                                                <Button variant="outline" class="h-8 px-2.5 text-xs text-slate-600 border-slate-300" onClick={() => setSelectedPatientId(p.patientId || p.id)}>View</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </Show>
                            </Suspense>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
