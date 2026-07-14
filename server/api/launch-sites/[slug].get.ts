import { loadEntity } from '~/server/util/data';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || '';
  const site = await loadEntity('launch-site', slug);
  if (!site) {
    throw createError({ statusCode: 404, statusMessage: 'Launch site not found' });
  }
  return site;
});
