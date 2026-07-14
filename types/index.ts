export type { BaseEntity, EntityKind, EntityRef } from './base';
export type { Rocket, RocketStatus, RocketEngineRef } from './rocket';
export type { Company, CompanyType } from './company';
export type { Engine, EngineCycle } from './engine';
export type { LaunchSite } from './launch-site';
export type { Mission, MissionType } from './mission';
export type {
  Launch,
  LaunchStatus,
  Orbit,
  Payload,
  Recovery,
} from './launch';
export type {
  Compare,
  CompareEntityRef,
  CompareRow,
  CompareFaq,
} from './compare';

import type { EntityKind } from './base';
import type { Rocket } from './rocket';
import type { Company } from './company';
import type { Engine } from './engine';
import type { LaunchSite } from './launch-site';
import type { Mission } from './mission';
import type { Launch } from './launch';
import type { Compare } from './compare';

/** Union of every entity type. */
export type Entity = Rocket | Company | Engine | LaunchSite | Mission | Launch | Compare;

/** Resolve an EntityKind to its concrete entity type. */
export type EntityByKind<K extends EntityKind> = Extract<Entity, { kind: K }>;

/** Map an EntityKind to its concrete type (lookup table form). */
export interface EntityKindMap {
  rocket: Rocket;
  company: Company;
  engine: Engine;
  'launch-site': LaunchSite;
  mission: Mission;
  launch: Launch;
  compare: Compare;
}

