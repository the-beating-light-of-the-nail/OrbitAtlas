import type { EntityKind } from '~/types';
import { kindToPath } from './relations';
import type { RelatedLink } from '~/components/RelatedLinks.vue';

/** Build a RelatedLink from a kind + slug, using a known display name if available. */
export function entityLink(
  kind: EntityKind,
  slug: string,
  name?: string | null,
  note?: string,
): RelatedLink {
  return {
    kind,
    slug,
    label: name ?? slug,
    note,
    to: kindToPath(kind).detail(slug),
  };
}
