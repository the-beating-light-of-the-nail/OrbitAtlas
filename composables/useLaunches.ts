import type { Launch } from '~/types';

export function useLaunches() {
  return useAsyncData<Launch[]>('launches:all', () => $fetch('/api/launches'));
}

export function useLaunch(slug: MaybeRefOrGetter<string>) {
  return useAsyncData<Launch | null>(
    () => `launch:${toValue(slug)}`,
    () => $fetch(`/api/launches/${toValue(slug)}`).catch(() => null),
  );
}
