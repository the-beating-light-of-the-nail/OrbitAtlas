import { loadEntity } from '~/server/util/data';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || '';
  const engine = await loadEntity('engine', slug);
  if (!engine) {
    throw createError({ statusCode: 404, statusMessage: 'Engine not found' });
  }
  return engine;
});
