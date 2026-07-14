import type { EntityKind } from '~/types';

/** Canonical site origin; falls back to localhost for dev. */
export function siteOrigin(): string {
  return (
    process.env.NUXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    'https://orbitatlas.example.com'
  );
}

/** Build a canonical URL for a path (without trailing slash except root). */
export function canonicalUrl(path: string): string {
  const origin = siteOrigin();
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${clean}`;
}

export interface SeoInput {
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/rockets/falcon-9". */
  path: string;
  /** Optional OG/Twitter image (absolute or root-relative). */
  image?: string;
  /** Optional canonical override. Defaults to canonicalUrl(path). */
  canonical?: string;
}

/** Apply SEO metadata to a page via Nuxt's useSeoMeta + useHead. */
export function applySeo(input: SeoInput): void {
  const canonical = input.canonical ?? canonicalUrl(input.path);
  const ogImage = input.image ?? '/og-default.png';

  useSeoMeta({
    title: input.title,
    description: input.description,
    ogTitle: input.title,
    ogDescription: input.description,
    ogUrl: canonical,
    ogImage,
    twitterTitle: input.title,
    twitterDescription: input.description,
    twitterImage: ogImage,
  });

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
  });
}

/** Inject JSON-LD structured data into the page head. */
export function useJsonLd(data: Record<string, unknown>): void {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(data),
      },
    ],
  });
}

/** A basic schema.org Article-like JSON-LD block for an entity page. */
export function entityJsonLd(input: {
  name: string;
  description: string;
  path: string;
  lastUpdated: string;
}): void {
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: input.name,
    description: input.description,
    url: canonicalUrl(input.path),
    dateModified: input.lastUpdated,
    author: { '@type': 'Organization', name: 'OrbitAtlas' },
    publisher: { '@type': 'Organization', name: 'OrbitAtlas' },
  });
}

/** Title pattern: "<Entity name> — <Kind> | OrbitAtlas". */
export function entityTitle(name: string, kind: EntityKind): string {
  const label = kindLabelTitle(kind);
  return `${name} — ${label} | OrbitAtlas`;
}

/** Short article-style title used on list/section pages. */
export function sectionTitle(label: string, suffix = 'OrbitAtlas'): string {
  return `${label} | ${suffix}`;
}

function kindLabelTitle(kind: EntityKind): string {
  switch (kind) {
    case 'rocket':
      return 'Rocket';
    case 'company':
      return 'Company';
    case 'launch':
      return 'Launch';
    case 'mission':
      return 'Mission';
    case 'engine':
      return 'Engine';
    case 'launch-site':
      return 'Launch Site';
    case 'compare':
      return 'Comparison';
    default:
      return 'Entity';
  }
}
