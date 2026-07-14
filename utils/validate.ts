import { entitySchema } from '~/schemas';
import type { Entity } from '~/types';

export interface ValidateResult {
  ok: boolean;
  entity?: Entity;
  errors?: string[];
}

/**
 * Validate an unknown JSON payload against the discriminated entity schema.
 * Returns a friendly result object so callers don't have to try/catch.
 */
export function validateEntity(data: unknown): ValidateResult {
  const parsed = entitySchema.safeParse(data);
  if (parsed.success) {
    return { ok: true, entity: parsed.data as Entity };
  }
  const errors = parsed.error.issues.map(
    (i) => `${i.path.join('.')}: ${i.message}`,
  );
  return { ok: false, errors };
}
