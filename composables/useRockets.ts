import type { Rocket } from '~/types';

/** All rockets, sorted by name. */
export function useRockets() {
  return useAsyncData<Rocket[]>('rockets:all', () =>
    $fetch('/api/rockets'),
  );
}

/** A single rocket by slug. Returns null when not found (caller handles 404). */
export function useRocket(slug: MaybeRefOrGetter<string>) {
  return useAsyncData<Rocket | null>(
    () => `rocket:${toValue(slug)}`,
    () => $fetch(`/api/rockets/${toValue(slug)}`).catch(() => null),
  );
}
