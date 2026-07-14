import type { BaseEntity } from './base';

export type LaunchStatus =
  | 'success'
  | 'failure'
  | 'partial-failure'
  | 'planned'
  | 'in-flight'
  | 'scrubbed';

export type Orbit =
  | 'LEO'
  | 'SSO'
  | 'MEO'
  | 'GTO'
  | 'GEO'
  | 'TLI'
  | 'suborbital'
  | 'helio'
  | 'other';

export interface Payload {
  /** Payload name, e.g. "Starlink-30214". */
  name: string;
  /** Payload type, e.g. "communications", "crewed-capsule". */
  type: string;
  /** Operating organisation company slug, or null. */
  operatorSlug?: string | null;
  /** Mass in kilograms. */
  massKg?: number | null;
  /** Target orbit. */
  orbit?: Orbit | null;
}

export interface Recovery {
  /** Recovery method. */
  type: 'droneship' | 'rtls' | 'catch' | 'parachute' | 'none';
  /** Vehicle / vessel name, e.g. "A Shortfall of Gravitas". */
  vehicle?: string | null;
  /** Outcome. */
  status: 'success' | 'failure' | 'not-attempted';
}

export interface Launch extends BaseEntity {
  kind: 'launch';
  /** Rocket slug used for this launch. */
  rocketSlug: string;
  /** Launch site slug. */
  launchSiteSlug: string;
  /** Operator / manufacturer company slug. */
  companySlug: string;
  /** ISO 8601 datetime, e.g. "2024-06-06T12:20:00Z". Null if not scheduled. */
  launchDate: string | null;
  /** Outcome. */
  status: LaunchStatus;
  /** Mission slug this launch belongs to, if any. */
  missionSlug?: string | null;
  /** Payloads carried. */
  payloads: Payload[];
  /** Target orbit for the primary payload. */
  orbit: Orbit | null;
  /** Recovery attempt for a booster / fairing, if any. */
  recovery?: Recovery | null;
  /** Webcast / livestream URL. */
  webcastUrl?: string | null;
  /** Flight number within the rocket's series, optional. */
  flightNumber?: number | null;
  /** Whether this is a Chinese program launch. */
  isChinaProgram?: boolean;
}
