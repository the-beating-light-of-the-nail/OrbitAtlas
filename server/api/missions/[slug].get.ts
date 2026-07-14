import { loadEntity } from '~/server/util/data';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || '';
  const mission = await loadEntity('mission', slug);
  if (!mission) {
    throw createError({ statusCode: 404, statusMessage: 'Mission not found' });
  }
  return mission;
});
