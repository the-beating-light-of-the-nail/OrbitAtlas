/**
 * Provider stubs are placeholders for future data-ingestion sources.
 *
 * In Phase 4+ these modules will fetch, normalise, and validate data from
 * public sources and write it into /database. They are intentionally empty in
 * the MVP — no external calls are made.
 *
 * Conventions:
 * - Each provider exports an async `fetchEntities()` returning unknown JSON.
 * - The caller (a future build/import script) validates with the Zod schemas
 *   before writing files.
 */

export interface Provider<T = unknown> {
  name: string;
  /** Fetch raw records; validation happens upstream. */
  fetchEntities(): Promise<T[]>;
}
