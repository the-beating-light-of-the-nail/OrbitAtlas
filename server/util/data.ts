import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { entitySchema } from '~/schemas';
import type { Entity, EntityByKind, EntityKind } from '~/types';

/**
 * Mapping from EntityKind -> database subdirectory name.
 * Keep this the single source of truth for filesystem layout.
 */
export const KIND_DIR: Record<EntityKind, string> = {
  rocket: 'rockets',
  company: 'companies',
  launch: 'launches',
  mission: 'missions',
  engine: 'engines',
  'launch-site': 'launch-sites',
  payload: 'payloads',
  recovery: 'recoveries',
  compare: 'compares',
};

const PROJECT_ROOT = process.cwd();
const DATABASE_ROOT = join(PROJECT_ROOT, 'database');

async function readJson<T = unknown>(file: string): Promise<T> {
  const raw = await readFile(file, 'utf8');
  return JSON.parse(raw) as T;
}

/** List all slug filenames (without `.json`) for a kind. */
export async function listSlugs(kind: EntityKind): Promise<string[]> {
  const dir = join(DATABASE_ROOT, KIND_DIR[kind]);
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }
  return entries
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.slice(0, -'.json'.length))
    .sort();
}

/** Load and validate a single entity by kind + slug. Returns null if missing. */
export async function loadEntity<K extends EntityKind>(
  kind: K,
  slug: string,
): Promise<EntityByKind<K> | null> {
  const file = join(DATABASE_ROOT, KIND_DIR[kind], `${slug}.json`);
  let exists = false;
  try {
    await stat(file);
    exists = true;
  } catch {
    return null;
  }
  if (!exists) return null;
  const raw = await readJson<unknown>(file);
  const parsed = entitySchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw createError({
      statusCode: 500,
      statusMessage: `Invalid data for ${kind} "${slug}": ${msg}`,
    });
  }
  return parsed.data as EntityByKind<K>;
}

/** Load every entity of a kind, validating each. Missing dir -> []. */
export async function loadAll<K extends EntityKind>(
  kind: K,
): Promise<EntityByKind<K>[]> {
  const slugs = await listSlugs(kind);
  const out: EntityByKind<K>[] = [];
  for (const slug of slugs) {
    const e = await loadEntity(kind, slug);
    if (e) out.push(e as EntityByKind<K>);
  }
  return out;
}

/** Convenience loader used by sitemap and home page. */
export async function loadAllEntities(): Promise<Entity[]> {
  const kinds: EntityKind[] = [
    'rocket',
    'company',
    'launch',
    'mission',
    'engine',
    'launch-site',
    'compare',
  ];
  const all: Entity[] = [];
  for (const k of kinds) {
    const items = await loadAll(k);
    all.push(...(items as Entity[]));
  }
  return all;
}
