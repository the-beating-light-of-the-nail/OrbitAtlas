import { z } from 'zod';
import { baseEntitySchema, slugSchema } from './base';

export const companyTypeSchema = z.enum([
  'state',
  'private',
  'state-owned-enterprise',
  'agency',
  'consortium',
]);

export const companySchema = baseEntitySchema.extend({
  kind: z.literal('company'),
  type: companyTypeSchema,
  founded: z
    .string()
    .regex(/^\d{4}$/)
    .nullish(),
  headquarters: z.string().nullish(),
  website: z.string().url().nullish(),
  rocketSlugs: z.array(slugSchema).default([]),
  isChinaProgram: z.boolean().optional(),
});
