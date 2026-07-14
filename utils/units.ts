/**
 * Unit formatting helpers. Keep output compact and consistent across the site.
 * Unknown values stay as "Unknown" rather than rendering "null".
 */

export function fmtNum(value: number | null | undefined, unit = '', digits = 0): string {
  if (value === null || value === undefined || Number.isNaN(value)) return 'Unknown';
  const formatted = digits
    ? value.toLocaleString('en-US', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      })
    : value.toLocaleString('en-US');
  return unit ? `${formatted} ${unit}` : formatted;
}

/** Kilograms -> "22,800 kg" or "22.8 t" for large masses. */
export function fmtMass(kg: number | null | undefined): string {
  if (kg === null || kg === undefined) return 'Unknown';
  if (kg >= 1000) return `${(kg / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 })} t`;
  return `${kg.toLocaleString('en-US')} kg`;
}

/** Metres -> "70 m" or "1.8 m". */
export function fmtLength(m: number | null | undefined): string {
  return fmtNum(m, 'm', m ? Math.abs(m) < 10 ? 1 : 0 : 0);
}

/** Kilometres / metres for diameter or small distances. */
export function fmtDiameter(m: number | null | undefined): string {
  return fmtNum(m, 'm', 1);
}

/** Kilonewtons -> "8,200 kN". */
export function fmtThrust(kn: number | null | undefined): string {
  return fmtNum(kn, 'kN');
}

/** Seconds of specific impulse -> "282 s". */
export function fmtIsp(s: number | null | undefined): string {
  return fmtNum(s, 's');
}

/** Friendly country label from an ISO 3166-1 alpha-2 code. */
const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  CN: 'China',
  RU: 'Russia',
  EU: 'European Union',
  FR: 'France',
  DE: 'Germany',
  GB: 'United Kingdom',
  IN: 'India',
  JP: 'Japan',
  NZ: 'New Zealand',
  KR: 'South Korea',
  UA: 'Ukraine',
  IL: 'Israel',
  INT: 'International',
};

export function fmtCountry(code: string | null | undefined): string {
  if (!code) return 'Unknown';
  return COUNTRY_NAMES[code] ?? code;
}
