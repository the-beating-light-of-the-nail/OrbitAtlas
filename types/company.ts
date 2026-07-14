import type { BaseEntity } from './base';

export type CompanyType = 'state' | 'private' | 'state-owned-enterprise' | 'agency' | 'consortium';

export interface Company extends BaseEntity {
  kind: 'company';
  /** Organisation type. */
  type: CompanyType;
  /** Founding year as a 4-digit string, or null if unknown. */
  founded: string | null;
  /** Headquarters city, free text. */
  headquarters?: string | null;
  /** Official website URL. */
  website?: string | null;
  /** Rocket slugs operated / manufactured by this company. */
  rocketSlugs: string[];
  /** Whether this is a Chinese space organisation. */
  isChinaProgram?: boolean;
}
