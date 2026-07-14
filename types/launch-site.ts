import type { BaseEntity } from './base';

export interface LaunchSite extends BaseEntity {
  kind: 'launch-site';
  /** Geographic coordinates. */
  location: {
    lat: number;
    lon: number;
  };
  /** Operating organisation company slug, or null. */
  operatorSlug: string | null;
  /** Current operational status. */
  status: 'active' | 'inactive' | 'in-development';
  /** Pad(s) / complexes at this site, free text list. */
  pads?: string[];
  /** Country-region code if the site serves a national program. */
  isChinaProgram?: boolean;
}
