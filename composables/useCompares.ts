import type { Compare } from '~/types';

export function useCompares() {
  return useAsyncData<Compare[]>('compares:all', () => $fetch('/api/compares'));
}

export function useCompare(slug: MaybeRefOrGetter<string>) {
  return useAsyncData<Compare | null>(
    () => `compare:${toValue(slug)}`,
    () => $fetch(`/api/compares/${toValue(slug)}`).catch(() => null),
  );
}
