import { loadAll } from '~/server/util/data';

export default defineEventHandler(async () => {
  const items = await loadAll('compare');
  return items.sort((a, b) => a.name.localeCompare(b.name));
});
