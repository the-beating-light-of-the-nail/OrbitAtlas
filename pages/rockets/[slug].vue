<template>
  <div v-if="rocket">
    <Breadcrumbs :crumbs="[{ label: 'Rockets', to: '/rockets' }, { label: rocket.name }]" />
    <div class="split">
      <div>
        <h1>{{ rocket.name }}</h1>
        <p class="lead">{{ rocket.description }}</p>
        <div class="tag-row">
          <Tag :label="fmtCountry(rocket.country)" />
          <Tag :label="rocket.reusable ? 'Reusable' : 'Expendable'" :variant="rocket.reusable ? 'ok' : 'dim'" />
          <Tag :label="statusLabel(rocket.status)" :variant="statusVariant(rocket.status)" />
        </div>
      </div>
      <div>
        <EntityTable :rows="factRows" />
      </div>
    </div>

    <section class="section tight">
      <h2>Engines</h2>
      <RelatedLinks :links="engineLinks" heading="Engines used" />
    </section>

    <section class="section tight">
      <h2>Related</h2>
      <RelatedLinks :links="relatedLinks" heading="Manufacturer, site &amp; program" />
    </section>

    <section class="section tight">
      <h2>Launch History</h2>
      <RelatedLinks :links="launchLinks" heading="Launches of this rocket" />
    </section>

    <section v-if="compareLinks.length" class="section tight">
      <h2>Comparisons</h2>
      <RelatedLinks :links="compareLinks" heading="Compare this rocket" />
    </section>

    <section v-if="rocket.sourceUrls.length" class="section tight">
      <h2>Sources</h2>
      <ul class="linklist">
        <li v-for="url in rocket.sourceUrls" :key="url">
          <a :href="url" target="_blank" rel="noopener noreferrer">{{ url }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Rocket, RocketStatus } from '~/types';
import type { FactRow } from '~/components/EntityTable.vue';
import type { RelatedLink } from '~/components/RelatedLinks.vue';
import { entityLink } from '~/utils/links';
import { fmtCountry, fmtLength, fmtDiameter, fmtMass, fmtNum } from '~/utils/units';
import { formatDate } from '~/utils/dates';
import { applySeo, entityTitle, entityJsonLd } from '~/utils/seo';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: rocket } = await useRocket(slug);
if (!rocket.value) {
  throw createError({ statusCode: 404, statusMessage: 'Rocket not found', fatal: true });
}

const r = rocket.value as Rocket;
const path = `/rockets/${r.slug}`;

applySeo({
  title: entityTitle(r.name, 'rocket'),
  description: r.description.slice(0, 155),
  path,
});
entityJsonLd({ name: r.name, description: r.description, path, lastUpdated: r.lastUpdated });

// Related lists (cached, shared with list pages).
const { data: companies } = useCompanies();
const { data: engines } = useEngines();
const { data: launches } = useLaunches();
const { data: sites } = useLaunchSites();
const { data: compares } = useCompares();

const companyMap = computed(() => new Map((companies.value ?? []).map((c) => [c.slug, c])));
const engineMap = computed(() => new Map((engines.value ?? []).map((e) => [e.slug, e])));
const siteMap = computed(() => new Map((sites.value ?? []).map((s) => [s.slug, s])));

const factRows = computed<FactRow[]>(() => [
  { key: 'country', label: 'Country', value: r.country, display: fmtCountry(r.country) },
  { key: 'manufacturer', label: 'Manufacturer', value: r.manufacturerSlug, display: companyMap.value.get(r.manufacturerSlug)?.name ?? 'Unknown' },
  { key: 'status', label: 'Status', value: r.status, display: statusLabel(r.status) },
  { key: 'reusable', label: 'Reusable', value: r.reusable, display: r.reusable ? 'Yes' : 'No' },
  { key: 'height', label: 'Height', value: r.heightM, display: fmtLength(r.heightM) },
  { key: 'diameter', label: 'Diameter', value: r.diameterM, display: fmtDiameter(r.diameterM) },
  { key: 'mass', label: 'Liftoff mass', value: r.massKg, display: fmtMass(r.massKg) },
  { key: 'leo', label: 'Payload to LEO', value: r.payloadToLeoKg, display: fmtMass(r.payloadToLeoKg) },
  { key: 'gto', label: 'Payload to GTO', value: r.payloadToGtoKg, display: fmtMass(r.payloadToGtoKg) },
  { key: 'stages', label: 'Stages', value: r.stages, display: fmtNum(r.stages) },
  { key: 'firstFlight', label: 'First flight', value: r.firstFlight, display: formatDate(r.firstFlight) },
]);

const engineLinks = computed<RelatedLink[]>(() =>
  r.engines.map((e) =>
    entityLink('engine', e.engineSlug, engineMap.value.get(e.engineSlug)?.name, `Stage ${e.stage} · ×${e.count}`),
  ),
);

const relatedLinks = computed<RelatedLink[]>(() => {
  const links: RelatedLink[] = [];
  const manufacturer = companyMap.value.get(r.manufacturerSlug);
  if (manufacturer) links.push(entityLink('company', manufacturer.slug, manufacturer.name, 'Manufacturer'));
  if (r.primaryLaunchSiteSlug) {
    const site = siteMap.value.get(r.primaryLaunchSiteSlug);
    links.push(entityLink('launch-site', r.primaryLaunchSiteSlug, site?.name, 'Primary launch site'));
  }
  return links;
});

const launchLinks = computed<RelatedLink[]>(() =>
  (launches.value ?? [])
    .filter((l) => l.rocketSlug === r.slug)
    .map((l) => entityLink('launch', l.slug, l.name, formatDate(l.launchDate))),
);

const compareLinks = computed<RelatedLink[]>(() =>
  (compares.value ?? [])
    .filter((c) => c.entities.some((e) => e.kind === 'rocket' && e.slug === r.slug))
    .map((c) => entityLink('compare', c.slug, c.name)),
);

function statusLabel(s: RocketStatus): string {
  return { active: 'Active', 'in-development': 'In development', retired: 'Retired', cancelled: 'Cancelled' }[s];
}
function statusVariant(s: RocketStatus): 'ok' | 'warn' | 'danger' | 'dim' {
  return ({ active: 'ok', 'in-development': 'warn', retired: 'dim', cancelled: 'danger' } as const)[s];
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
