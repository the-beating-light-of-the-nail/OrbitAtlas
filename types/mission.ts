import type { BaseEntity } from './base';

export type MissionType =
  | 'communications'
  | 'earth-observation'
  | 'navigation'
  | 'crewed'
  | 'cargo'
  | 'lunar'
  | 'interplanetary'
  | 'technology-demonstration'
  | 'national-program'
  | 'other';

export interface Mission extends BaseEntity {
  kind: 'mission';
  /** Operating organisation company slug. */
  operatorSlug: string | null;
  type: MissionType;
  /** Launch slugs that are part of this mission/program. */
  launchSlugs: string[];
  /** Target orbit or destination, free text. */
  target?: string | null;
  /** Whether this is part of the Chinese space program. */
  isChinaProgram?: boolean;
}
