import { loadEntity } from '~/server/util/data';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || '';
  const company = await loadEntity('company', slug);
  if (!company) {
    throw createError({ statusCode: 404, statusMessage: 'Company not found' });
  }
  return company;
});
