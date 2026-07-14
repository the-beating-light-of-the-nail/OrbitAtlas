import { z } from 'zod';
import { baseEntitySchema, slugSchema } from './base';

export const launchSiteSchema = baseEntitySchema.extend({
  kind: z.literal('launch-site'),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
  }),
  operatorSlug: slugSchema.nullish(),
  status: z.enum(['active', 'inactive', 'in-development']),
  pads: z.array(z.string()).optional(),
  isChinaProgram: z.boolean().optional(),
});
