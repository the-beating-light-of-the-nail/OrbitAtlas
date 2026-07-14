import { loadEntity } from '~/server/util/data';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || '';
  const launch = await loadEntity('launch', slug);
  if (!launch) {
    throw createError({ statusCode: 404, statusMessage: 'Launch not found' });
  }
  return launch;
});
