import { loadAllEntities } from '~/server/util/data';
import { kindToPath } from '~/utils/relations';
import { siteOrigin } from '~/utils/seo';
import type { EntityKind } from '~/types';

/** Static, always-present routes. */
const STATIC_ROUTES = [
  '/',
  '/rockets',
  '/companies',
  '/launches',
  '/missions',
  '/engines',
  '/launch-sites',
  '/china-space-program',
  '/china/rockets',
  '/china/companies',
  '/china/launches',
  '/china/reusable-rockets',
  '/china/moon-program',
  '/china/space-station',
  '/china/launch-sites',
  '/compare',
];

export default defineEventHandler(async (event) => {
  const origin = siteOrigin();
  const entities = await loadAllEntities();

  const urls: { loc: string; kind?: EntityKind; lastmod?: string }[] = STATIC_ROUTES.map(
    (loc) => ({ loc }),
  );

  for (const e of entities) {
    const detail = kindToPath(e.kind).detail(e.slug);
    urls.push({ loc: detail, kind: e.kind, lastmod: e.lastUpdated });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${origin}${u.loc}</loc>${
        u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''
      }\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
  return body;
});
