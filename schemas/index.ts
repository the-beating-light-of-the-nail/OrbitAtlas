export { baseEntitySchema, entityKindSchema, entityRefSchema, slugSchema } from './base';
export { rocketSchema, rocketStatusSchema, rocketEngineRefSchema } from './rocket';
export { companySchema, companyTypeSchema } from './company';
export { engineSchema, engineCycleSchema } from './engine';
export { launchSiteSchema } from './launch-site';
export { missionSchema, missionTypeSchema } from './mission';
export {
  launchSchema,
  launchStatusSchema,
  orbitSchema,
  payloadSchema,
  recoverySchema,
} from './launch';
export {
  compareSchema,
  compareEntityRefSchema,
  compareRowSchema,
  compareFaqSchema,
} from './compare';

import { z } from 'zod';
import { rocketSchema } from './rocket';
import { companySchema } from './company';
import { engineSchema } from './engine';
import { launchSiteSchema } from './launch-site';
import { missionSchema } from './mission';
import { launchSchema } from './launch';
import { compareSchema } from './compare';

/**
 * Discriminated union of every entity schema. Used by the data layer to
 * validate JSON files at load time based on their `kind` field.
 */
export const entitySchema = z.discriminatedUnion('kind', [
  rocketSchema,
  companySchema,
  engineSchema,
  launchSiteSchema,
  missionSchema,
  launchSchema,
  compareSchema,
]);
