import { loadEntity } from '~/server/util/data';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || '';
  const compare = await loadEntity('compare', slug);
  if (!compare) {
    throw createError({ statusCode: 404, statusMessage: 'Comparison not found' });
  }
  return compare;
});
