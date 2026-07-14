import type { Engine } from '~/types';

export function useEngines() {
  return useAsyncData<Engine[]>('engines:all', () => $fetch('/api/engines'));
}

export function useEngine(slug: MaybeRefOrGetter<string>) {
  return useAsyncData<Engine | null>(
    () => `engine:${toValue(slug)}`,
    () => $fetch(`/api/engines/${toValue(slug)}`).catch(() => null),
  );
}
