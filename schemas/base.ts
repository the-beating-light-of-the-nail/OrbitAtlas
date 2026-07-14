import { z } from 'zod';

/** Slug: lowercase, kebab-case, no leading/trailing dashes. */
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be kebab-case')
  .max(80);

export const entityKindSchema = z.enum([
  'rocket',
  'company',
  'launch',
  'mission',
  'engine',
  'launch-site',
  'payload',
  'recovery',
  'compare',
]);

/** Shared base fields — every entity schema extends this. */
export const baseEntitySchema = z.object({
  slug: slugSchema,
  name: z.string().min(1).max(120),
  shortName: z.string().min(1).max(40).nullish(),
  country: z.string().min(2).max(3),
  description: z.string().min(10).max(2000),
  sourceUrls: z.array(z.string().url()).default([]),
  lastUpdated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  image: z.string().nullish(),
});

export const entityRefSchema = z.object({
  kind: entityKindSchema,
  slug: slugSchema,
  name: z.string().optional(),
});
