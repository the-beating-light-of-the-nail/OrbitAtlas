import type { Mission } from '~/types';

export function useMissions() {
  return useAsyncData<Mission[]>('missions:all', () => $fetch('/api/missions'));
}

export function useMission(slug: MaybeRefOrGetter<string>) {
  return useAsyncData<Mission | null>(
    () => `mission:${toValue(slug)}`,
    () => $fetch(`/api/missions/${toValue(slug)}`).catch(() => null),
  );
}
