import { siteOrigin } from '~/utils/seo';

export default defineEventHandler((event) => {
  const origin = siteOrigin();
  const body = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  return body;
});
