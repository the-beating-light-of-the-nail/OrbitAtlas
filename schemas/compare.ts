import { z } from 'zod';
import { baseEntitySchema, entityKindSchema, slugSchema } from './base';

export const compareEntityRefSchema = z.object({
  kind: entityKindSchema.exclude([z.literal('compare').value]),
  slug: slugSchema,
  label: z.string().optional(),
});

export const compareRowSchema = z.object({
  attribute: z.string().min(1),
  values: z.array(z.union([z.string(), z.number(), z.null()])),
});

export const compareFaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const compareSchema = baseEntitySchema.extend({
  kind: z.literal('compare'),
  entities: z.array(compareEntityRefSchema).min(2).max(4),
  summary: z.string().min(10).max(1000),
  comparisonTable: z.array(compareRowSchema).default([]),
  keySimilarities: z.array(z.string()).default([]),
  keyDifferences: z.array(z.string()).default([]),
  useCases: z.array(z.string()).default([]),
  limitations: z.array(z.string()).default([]),
  faqs: z.array(compareFaqSchema).default([]),
});
