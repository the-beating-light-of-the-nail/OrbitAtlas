/**
 * Common fields shared by every entity in the OrbitAtlas knowledge graph.
 * Keep this stable — it drives the migration story from JSON -> Prisma/Turso.
 */
export interface BaseEntity {
  /** URL-safe identifier, also the filename without `.json`. */
  slug: string;
  /** Display name, e.g. "Falcon 9". */
  name: string;
  /** Optional shorter label for compact UI, e.g. "F9". */
  shortName?: string | null;
  /** ISO 3166-1 alpha-2 country code, or "INT" for international orgs. */
  country: string;
  /** Neutral, factual summary. Plain text, no marketing tone. */
  description: string;
  /** Source URLs backing the data, for credibility and future auditing. */
  sourceUrls: string[];
  /** ISO 8601 date of last editorial review, e.g. "2025-06-01". */
  lastUpdated: string;
  /** Optional image path under /public/images. */
  image?: string | null;
}

export type EntityKind =
  | 'rocket'
  | 'company'
  | 'launch'
  | 'mission'
  | 'engine'
  | 'launch-site'
  | 'payload'
  | 'recovery'
  | 'compare';

/** Minimal reference used in "related entities" sections. */
export interface EntityRef {
  kind: EntityKind;
  slug: string;
  name?: string;
}
