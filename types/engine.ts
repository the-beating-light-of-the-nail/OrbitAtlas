import type { BaseEntity } from './base';

export type EngineCycle =
  | 'gas-generator'
  | 'staged-combustion'
  | 'full-flow-staged-combustion'
  | 'expander'
  | 'electric-pump'
  | 'pressure-fed'
  | 'solid'
  | 'other';

export interface Engine extends BaseEntity {
  kind: 'engine';
  /** Manufacturer company slug. */
  manufacturerSlug: string;
  cycle: EngineCycle;
  /** Propellants, e.g. ["lox", "kerosene"]. */
  propellants: string[];
  /** Sea-level thrust in kilonewtons. */
  thrustSeaKn: number | null;
  /** Vacuum thrust in kilonewtons. */
  thrustVacKn: number | null;
  /** Sea-level specific impulse in seconds. */
  ispSeaS: number | null;
  /** Vacuum specific impulse in seconds. */
  ispVacS: number | null;
  /** Whether the engine is designed for reuse. */
  reusable: boolean;
  /** Rocket slugs that use this engine. */
  rocketSlugs: string[];
}
