import { createSignal, onMount, Show, For } from 'solid-js';
import { getRegions, getProvinces, getCitiesMunicipalities, getBarangays } from '@/lib/psgcApi';

interface Region { code: string; name: string; }
interface Province { code: string; name: string; }
interface CityMunicipality { code: string; name: string; }
interface Barangay { code: string; name: string; }

interface LocationSelectProps {
  addressLine1?: string;
  regionCode: string;
  provinceCode: string;
  provinceName?: string;
  municipalityCode: string;
  municipalityName?: string;
  barangayCode: string;
  barangayName?: string;
  onAddressLine1Change?: (value: string) => void;
  onRegionChange: (code: string, name: string, isAutoResolve?: boolean) => void;
  onProvinceChange: (code: string, name: string, isAutoResolve?: boolean) => void;
  onMunicipalityChange: (code: string, name: string, isAutoResolve?: boolean) => void;
  onBarangayChange: (code: string, name: string, isAutoResolve?: boolean) => void;
}

export function LocationSelect(props: LocationSelectProps) {
  const [loading, setLoading] = createSignal(true);
  const [regions, setRegions] = createSignal<Region[]>([]);
  const [provinces, setProvinces] = createSignal<Province[]>([]);
  const [municipalities, setMunicipalities] = createSignal<CityMunicipality[]>([]);
  const [barangays, setBarangays] = createSignal<Barangay[]>([]);

  onMount(async () => {
    setLoading(true);
    try {
      const regData = await getRegions();
      setRegions(regData);

      let currentProvCode = props.provinceCode;
      let currentMunCode = props.municipalityCode;
      let currentBrgyCode = props.barangayCode;

      if (props.regionCode) {
        const provData = await getProvinces(props.regionCode);
        setProvinces(provData);
        
        if (!currentProvCode && props.provinceName) {
           const found = provData.find(p => p.name.toUpperCase() === props.provinceName?.toUpperCase());
           if (found) {
             currentProvCode = found.code;
             props.onProvinceChange(found.code, found.name, true);
           }
        }

        if (currentProvCode) {
           const munData = await getCitiesMunicipalities(currentProvCode);
           setMunicipalities(munData);

           if (!currentMunCode && props.municipalityName) {
             const found = munData.find(m => m.name.toUpperCase() === props.municipalityName?.toUpperCase());
             if (found) {
               currentMunCode = found.code;
               props.onMunicipalityChange(found.code, found.name, true);
             }
           }

           if (currentMunCode) {
             const brgyData = await getBarangays(currentMunCode);
             setBarangays(brgyData);

             if (!currentBrgyCode && props.barangayName) {
               const found = brgyData.find(b => b.name.toUpperCase() === props.barangayName?.toUpperCase());
               if (found) {
                 currentBrgyCode = found.code;
                 props.onBarangayChange(found.code, found.name, true);
               }
             }
           }
        }
      }
    } catch (e) {
      console.error("Error loading location data", e);
    } finally {
      setLoading(false);
    }
  });

  const handleManualRegionChange = async (e: Event) => {
    const code = (e.target as HTMLSelectElement).value;
    const name = regions().find(r => r.code === code)?.name || '';
    
    setProvinces([]);
    setMunicipalities([]);
    setBarangays([]);
    props.onRegionChange(code, name, false);

    if (code) {
      const provData = await getProvinces(code);
      setProvinces(provData);
    }
  };

  const handleManualProvinceChange = async (e: Event) => {
    const code = (e.target as HTMLSelectElement).value;
    const name = provinces().find(p => p.code === code)?.name || '';
    
    setMunicipalities([]);
    setBarangays([]);
    props.onProvinceChange(code, name, false);

    if (code) {
      const munData = await getCitiesMunicipalities(code);
      setMunicipalities(munData);
    }
  };

  const handleManualMunicipalityChange = async (e: Event) => {
    const code = (e.target as HTMLSelectElement).value;
    const name = municipalities().find(m => m.code === code)?.name || '';
    
    setBarangays([]);
    props.onMunicipalityChange(code, name, false);

    if (code) {
      const brgyData = await getBarangays(code);
      setBarangays(brgyData);
    }
  };

  const handleManualBarangayChange = (e: Event) => {
    const code = (e.target as HTMLSelectElement).value;
    const name = barangays().find(b => b.code === code)?.name || '';
    props.onBarangayChange(code, name, false);
  };

  return (
    <div class="space-y-3 relative">
      <Show when={loading()}>
        <div class="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-md border border-slate-100 shadow-sm">
          <div class="flex items-center space-x-2 text-emerald-600">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm font-medium">Loading location data...</span>
          </div>
        </div>
      </Show>

      <div>
        <label class="block text-xs text-slate-600 mb-1">Address Line 1</label>
        <input
          type="text"
          class="w-full px-3 py-2 text-sm border border-slate-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500"
          value={props.addressLine1 || ''}
          onInput={(e) => props.onAddressLine1Change?.(e.target.value)}
          placeholder="Street address, Purok, etc."
          disabled={loading()}
        />
      </div>

      <div>
        <label class="block text-xs text-slate-600 mb-1">Region</label>
        <select
          class="w-full px-3 py-2 text-sm border border-slate-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500"
          value={props.regionCode || ''}
          onChange={handleManualRegionChange}
          disabled={loading()}
        >
          <option value="">-- Select Region --</option>
          <For each={regions()}>{(region) => (
            <option value={region.code}>{region.name}</option>
          )}</For>
        </select>
      </div>

      <div>
        <label class="block text-xs text-slate-600 mb-1">Province</label>
        <select
          class="w-full px-3 py-2 text-sm border border-slate-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500"
          value={props.provinceCode || ''}
          disabled={!props.regionCode || loading()}
          onChange={handleManualProvinceChange}
        >
          <option value="">-- Select Province --</option>
          <For each={provinces()}>{(province) => (
            <option value={province.code}>{province.name}</option>
          )}</For>
        </select>
      </div>

      <div>
        <label class="block text-xs text-slate-600 mb-1">City/Municipality</label>
        <select
          class="w-full px-3 py-2 text-sm border border-slate-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500"
          value={props.municipalityCode || ''}
          disabled={!props.provinceCode || loading()}
          onChange={handleManualMunicipalityChange}
        >
          <option value="">-- Select City/Municipality --</option>
          <For each={municipalities()}>{(mun) => (
            <option value={mun.code}>{mun.name}</option>
          )}</For>
        </select>
      </div>

      <div>
        <label class="block text-xs text-slate-600 mb-1">Barangay</label>
        <select
          class="w-full px-3 py-2 text-sm border border-slate-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500"
          value={props.barangayCode || ''}
          disabled={!props.municipalityCode || loading()}
          onChange={handleManualBarangayChange}
        >
          <option value="">-- Select Barangay --</option>
          <For each={barangays()}>{(brgy) => (
            <option value={brgy.code}>{brgy.name}</option>
          )}</For>
        </select>
      </div>
    </div>
  );
}