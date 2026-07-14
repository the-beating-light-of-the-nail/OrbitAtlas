import type { EntityKind } from '~/types';

/** Map an entity kind to its list/detail URL prefix on the site. */
export function kindToPath(kind: EntityKind): { list: string; detail: (slug: string) => string } {
  switch (kind) {
    case 'rocket':
      return { list: '/rockets', detail: (s) => `/rockets/${s}` };
    case 'company':
      return { list: '/companies', detail: (s) => `/companies/${s}` };
    case 'launch':
      return { list: '/launches', detail: (s) => `/launches/${s}` };
    case 'mission':
      return { list: '/missions', detail: (s) => `/missions/${s}` };
    case 'engine':
      return { list: '/engines', detail: (s) => `/engines/${s}` };
    case 'launch-site':
      return { list: '/launch-sites', detail: (s) => `/launch-sites/${s}` };
    case 'compare':
      return { list: '/compare', detail: (s) => `/compare/${s}` };
    default:
      return { list: '/', detail: (s) => `/${s}` };
  }
}

/** Human label for an entity kind, used in breadcrumbs / UI. */
export function kindLabel(kind: EntityKind): string {
  switch (kind) {
    case 'rocket':
      return 'Rockets';
    case 'company':
      return 'Companies';
    case 'launch':
      return 'Launches';
    case 'mission':
      return 'Missions';
    case 'engine':
      return 'Engines';
    case 'launch-site':
      return 'Launch Sites';
    case 'compare':
      return 'Compare';
    default:
      return 'Entities';
  }
}
