<template>
  <div v-if="site">
    <Breadcrumbs :crumbs="[{ label: 'Launch Sites', to: '/launch-sites' }, { label: site.name }]" />
    <div class="split">
      <div>
        <h1>{{ site.name }}</h1>
        <p class="lead">{{ site.description }}</p>
        <div class="tag-row">
          <Tag :label="fmtCountry(site.country)" />
          <Tag :label="statusLabel(site.status)" :variant="site.status === 'active' ? 'ok' : 'dim'" />
          <Tag v-if="site.isChinaProgram" label="China program" />
        </div>
      </div>
      <div>
        <EntityTable :rows="factRows" />
      </div>
    </div>

    <section class="section tight">
      <h2>Operator &amp; Launches</h2>
      <RelatedLinks :links="relatedLinks" heading="Operator and launches from this site" />
    </section>

    <section v-if="site.sourceUrls.length" class="section tight">
      <h2>Sources</h2>
      <ul class="linklist">
        <li v-for="url in site.sourceUrls" :key="url">
          <a :href="url" target="_blank" rel="noopener noreferrer">{{ url }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { LaunchSite } from '~/types';
import type { FactRow } from '~/components/EntityTable.vue';
import type { RelatedLink } from '~/components/RelatedLinks.vue';
import { entityLink } from '~/utils/links';
import { fmtCountry } from '~/utils/units';
import { formatDate } from '~/utils/dates';
import { applySeo, entityTitle, entityJsonLd } from '~/utils/seo';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: site } = await useLaunchSite(slug);
if (!site.value) {
  throw createError({ statusCode: 404, statusMessage: 'Launch site not found', fatal: true });
}

const s = site.value as LaunchSite;
const path = `/launch-sites/${s.slug}`;

applySeo({
  title: entityTitle(s.name, 'launch-site'),
  description: s.description.slice(0, 155),
  path,
});
entityJsonLd({ name: s.name, description: s.description, path, lastUpdated: s.lastUpdated });

const { data: companies } = useCompanies();
const { data: launches } = useLaunches();

const companyMap = computed(() => new Map((companies.value ?? []).map((c) => [c.slug, c])));

const factRows = computed<FactRow[]>(() => [
  { key: 'country', label: 'Country', value: s.country, display: fmtCountry(s.country) },
  { key: 'coords', label: 'Coordinates', value: s.location, display: `${s.location.lat.toFixed(3)}, ${s.location.lon.toFixed(3)}` },
  { key: 'operator', label: 'Operator', value: s.operatorSlug, display: s.operatorSlug ? (companyMap.value.get(s.operatorSlug)?.name ?? 'Unknown') : 'Unknown' },
  { key: 'status', label: 'Status', value: s.status, display: statusLabel(s.status) },
  { key: 'pads', label: 'Pads', value: s.pads, display: s.pads?.join(', ') ?? 'Unknown' },
]);

const relatedLinks = computed<RelatedLink[]>(() => {
  const links: RelatedLink[] = [];
  if (s.operatorSlug) {
    const op = companyMap.value.get(s.operatorSlug);
    if (op) links.push(entityLink('company', op.slug, op.name, 'Operator'));
  }
  for (const l of launches.value ?? []) {
    if (l.launchSiteSlug === s.slug) {
      links.push(entityLink('launch', l.slug, l.name, formatDate(l.launchDate)));
    }
  }
  return links;
});

function statusLabel(st: LaunchSite['status']): string {
  return { active: 'Active', inactive: 'Inactive', 'in-development': 'In development' }[st];
}
</script>

<style scoped>
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
</style>
