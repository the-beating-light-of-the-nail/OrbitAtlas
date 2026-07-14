import type { Company } from '~/types';

export function useCompanies() {
  return useAsyncData<Company[]>('companies:all', () => $fetch('/api/companies'));
}

export function useCompany(slug: MaybeRefOrGetter<string>) {
  return useAsyncData<Company | null>(
    () => `company:${toValue(slug)}`,
    () => $fetch(`/api/companies/${toValue(slug)}`).catch(() => null),
  );
}
