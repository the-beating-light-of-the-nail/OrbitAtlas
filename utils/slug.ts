/**
 * Slugify a free-form name into a kebab-case slug.
 * "Long March 5" -> "long-march-5", "Zhuque-3" -> "zhuque-3".
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** True if a string is already a valid kebab-case slug. */
export function isSlug(input: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input);
}
