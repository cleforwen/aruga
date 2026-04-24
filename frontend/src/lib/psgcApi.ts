const PSGC_BASE = 'https://psgc.gitlab.io/api';

export interface Region {
  code: string;
  name: string;
  psgc10DigitCode: string;
}

export interface Province {
  code: string;
  name: string;
  regionCode: string;
  psgc10DigitCode: string;
}

export interface CityMunicipality {
  code: string;
  name: string;
  provinceCode: string;
  psgc10DigitCode: string;
  type?: string;
}

export interface SubMunicipality {
  code: string;
  name: string;
  provinceCode: string;
  psgc10DigitCode: string;
}

export interface Barangay {
  code: string;
  name: string;
  cityMunicipalityCode: string;
  psgc10DigitCode: string;
}

export async function getRegions(): Promise<Region[]> {
  const res = await fetch(`${PSGC_BASE}/regions/`);
  return res.json();
}

export async function getProvinces(regionCode: string): Promise<Province[]> {
  const res = await fetch(`${PSGC_BASE}/regions/${regionCode}/provinces/`);
  return res.json();
}

export async function getCitiesMunicipalities(provinceCode: string): Promise<CityMunicipality[]> {
  const [citiesRes, subMuniRes] = await Promise.all([
    fetch(`${PSGC_BASE}/provinces/${provinceCode}/cities-municipalities/`),
    fetch(`${PSGC_BASE}/provinces/${provinceCode}/sub-municipalities/`),
  ]);

  const cities = await citiesRes.json();
  const subMunis = await subMuniRes.json();

  const combined = [
    ...(Array.isArray(cities) ? cities : []),
    ...(Array.isArray(subMunis) ? subMunis : []),
  ];

  return combined.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getBarangays(cityOrMunicipalityCode: string): Promise<Barangay[]> {
  try {
    const res = await fetch(`${PSGC_BASE}/cities-municipalities/${cityOrMunicipalityCode}/barangays/`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // Fall through to try sub-municipalities
  }

  try {
    const res = await fetch(`${PSGC_BASE}/sub-municipalities/${cityOrMunicipalityCode}/barangays/`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // Return empty if both fail
  }

  return [];
}