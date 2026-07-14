import { z } from 'zod';
import { baseEntitySchema, slugSchema } from './base';

export const launchStatusSchema = z.enum([
  'success',
  'failure',
  'partial-failure',
  'planned',
  'in-flight',
  'scrubbed',
]);

export const orbitSchema = z.enum([
  'LEO',
  'SSO',
  'MEO',
  'GTO',
  'GEO',
  'TLI',
  'suborbital',
  'helio',
  'other',
]);

export const payloadSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  operatorSlug: slugSchema.nullish(),
  massKg: z.number().nonnegative().nullish(),
  orbit: orbitSchema.nullish(),
});

export const recoverySchema = z.object({
  type: z.enum(['droneship', 'rtls', 'catch', 'parachute', 'none']),
  vehicle: z.string().nullish(),
  status: z.enum(['success', 'failure', 'not-attempted']),
});

export const launchSchema = baseEntitySchema.extend({
  kind: z.literal('launch'),
  rocketSlug: slugSchema,
  launchSiteSlug: slugSchema,
  companySlug: slugSchema,
  launchDate: z.string().datetime({ offset: true }).nullish(),
  status: launchStatusSchema,
  missionSlug: slugSchema.nullish(),
  payloads: z.array(payloadSchema).default([]),
  orbit: orbitSchema.nullish(),
  recovery: recoverySchema.nullish(),
  webcastUrl: z.string().url().nullish(),
  flightNumber: z.number().int().nonnegative().nullish(),
  isChinaProgram: z.boolean().optional(),
});
