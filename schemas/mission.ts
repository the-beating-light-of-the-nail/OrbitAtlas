import { z } from 'zod';
import { baseEntitySchema, slugSchema } from './base';

export const missionTypeSchema = z.enum([
  'communications',
  'earth-observation',
  'navigation',
  'crewed',
  'cargo',
  'lunar',
  'interplanetary',
  'technology-demonstration',
  'national-program',
  'other',
]);

export const missionSchema = baseEntitySchema.extend({
  kind: z.literal('mission'),
  operatorSlug: slugSchema.nullish(),
  type: missionTypeSchema,
  launchSlugs: z.array(slugSchema).default([]),
  target: z.string().nullish(),
  isChinaProgram: z.boolean().optional(),
});
