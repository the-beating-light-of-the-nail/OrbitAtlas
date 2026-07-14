import { loadAll } from '~/server/util/data';

export default defineEventHandler(async () => {
  const items = await loadAll('launch');
  // Newest first; nulls (planned with no date) sink to the bottom.
  return items.sort((a, b) => {
    if (!a.launchDate && !b.launchDate) return a.name.localeCompare(b.name);
    if (!a.launchDate) return 1;
    if (!b.launchDate) return -1;
    return b.launchDate.localeCompare(a.launchDate);
  });
});
