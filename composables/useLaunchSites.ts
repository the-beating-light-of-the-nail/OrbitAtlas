import type { LaunchSite } from '~/types';

export function useLaunchSites() {
  return useAsyncData<LaunchSite[]>('launch-sites:all', () =>
    $fetch('/api/launch-sites'),
  );
}

export function useLaunchSite(slug: MaybeRefOrGetter<string>) {
  return useAsyncData<LaunchSite | null>(
    () => `launch-site:${toValue(slug)}`,
    () => $fetch(`/api/launch-sites/${toValue(slug)}`).catch(() => null),
  );
}
