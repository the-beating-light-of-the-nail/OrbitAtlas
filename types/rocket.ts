import type { BaseEntity } from './base';

export type RocketStatus = 'active' | 'in-development' | 'retired' | 'cancelled';

/** A reusable link to an engine used by a stage of the rocket. */
export interface RocketEngineRef {
  engineSlug: string;
  /** Stage number this engine is mounted on, 1 = booster / first stage. */
  stage: number;
  /** Count of engines on that stage. */
  count: number;
}

export interface Rocket extends BaseEntity {
  kind: 'rocket';
  /** Company / manufacturer slug, e.g. "spacex". */
  manufacturerSlug: string;
  status: RocketStatus;
  /** True if any stage is designed to be recovered and reused. */
  reusable: boolean;
  /** Height in metres. `null` when not publicly confirmed. */
  heightM: number | null;
  /** Diameter in metres. */
  diameterM: number | null;
  /** Gross liftoff mass in tonnes. */
  massKg: number | null;
  /** Payload to low Earth orbit in kilograms. */
  payloadToLeoKg: number | null;
  /** Payload to geostationary transfer orbit in kilograms. */
  payloadToGtoKg: number | null;
  /** Number of stages. */
  stages: number | null;
  /** Engines used per stage. */
  engines: RocketEngineRef[];
  /** ISO date of first orbital flight, or null if not yet flown. */
  firstFlight: string | null;
  /** Slug of the launch site most associated with this rocket (optional). */
  primaryLaunchSiteSlug?: string | null;
  /** Whether this is a Chinese program rocket — drives the China section. */
  isChinaProgram?: boolean;
}
