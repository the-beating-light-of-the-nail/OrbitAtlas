import { z } from 'zod';
import { baseEntitySchema, slugSchema } from './base';

export const rocketStatusSchema = z.enum([
  'active',
  'in-development',
  'retired',
  'cancelled',
]);

export const rocketEngineRefSchema = z.object({
  engineSlug: slugSchema,
  stage: z.number().int().min(1).max(10),
  count: z.number().int().min(1).max(100),
});

export const rocketSchema = baseEntitySchema.extend({
  kind: z.literal('rocket'),
  manufacturerSlug: slugSchema,
  status: rocketStatusSchema,
  reusable: z.boolean(),
  heightM: z.number().positive().nullish(),
  diameterM: z.number().positive().nullish(),
  massKg: z.number().positive().nullish(),
  payloadToLeoKg: z.number().nonnegative().nullish(),
  payloadToGtoKg: z.number().nonnegative().nullish(),
  stages: z.number().int().min(1).max(10).nullish(),
  engines: z.array(rocketEngineRefSchema).default([]),
  firstFlight: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullish(),
  primaryLaunchSiteSlug: slugSchema.nullish(),
  isChinaProgram: z.boolean().optional(),
});
