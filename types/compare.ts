import type { BaseEntity, EntityKind } from './base';

/** One side of a comparison page. */
export interface CompareEntityRef {
  kind: Exclude<EntityKind, 'compare'>;
  slug: string;
  /** Optional display label overriding the entity name. */
  label?: string;
}

export interface CompareRow {
  /** Attribute name, e.g. "Height", "Payload to LEO". */
  attribute: string;
  /** One value per compared entity, in order. Use null for unknown. */
  values: (string | number | null)[];
}

export interface CompareFaq {
  question: string;
  answer: string;
}

export interface Compare extends BaseEntity {
  kind: 'compare';
  /** Entities being compared (usually 2). */
  entities: CompareEntityRef[];
  /** Short editorial summary at the top of the page. */
  summary: string;
  /** Side-by-side comparison table. */
  comparisonTable: CompareRow[];
  /** Bullet points of similarities. */
  keySimilarities: string[];
  /** Bullet points of differences. */
  keyDifferences: string[];
  /** Use-case framing. */
  useCases: string[];
  /** Limitations / unknowns, kept honest per the blueprint. */
  limitations: string[];
  /** FAQ entries. */
  faqs: CompareFaq[];
}
