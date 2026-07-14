import { z } from 'zod';
import { baseEntitySchema, slugSchema } from './base';

export const engineCycleSchema = z.enum([
  'gas-generator',
  'staged-combustion',
  'full-flow-staged-combustion',
  'expander',
  'electric-pump',
  'pressure-fed',
  'solid',
  'other',
]);

export const engineSchema = baseEntitySchema.extend({
  kind: z.literal('engine'),
  manufacturerSlug: slugSchema,
  cycle: engineCycleSchema,
  propellants: z.array(z.string().min(1)).default([]),
  thrustSeaKn: z.number().nonnegative().nullish(),
  thrustVacKn: z.number().nonnegative().nullish(),
  ispSeaS: z.number().nonnegative().nullish(),
  ispVacS: z.number().nonnegative().nullish(),
  reusable: z.boolean(),
  rocketSlugs: z.array(slugSchema).default([]),
});
