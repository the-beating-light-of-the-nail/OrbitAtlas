import { loadAll } from '~/server/util/data';

export default defineEventHandler(async () => {
  const items = await loadAll('rocket');
  return items.sort((a, b) => a.name.localeCompare(b.name));
});
