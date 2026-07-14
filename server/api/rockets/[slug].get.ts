import { loadEntity } from '~/server/util/data';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || '';
  const rocket = await loadEntity('rocket', slug);
  if (!rocket) {
    throw createError({ statusCode: 404, statusMessage: 'Rocket not found' });
  }
  return rocket;
});
