<template>
  <div v-if="engine">
    <Breadcrumbs :crumbs="[{ label: 'Engines', to: '/engines' }, { label: engine.name }]" />
    <div class="split">
      <div>
        <h1>{{ engine.name }}</h1>
        <p class="lead">{{ engine.description }}</p>
        <div class="tag-row">
          <Tag :label="fmtCountry(engine.country)" />
          <Tag :label="cycleLabel(engine.cycle)" variant="dim" />
          <Tag :label="engine.reusable ? 'Reusable' : 'Not reusable'" :variant="engine.reusable ? 'ok' : 'dim'" />
        </div>
      </div>
      <div>
        <EntityTable :rows="factRows" />
      </div>
    </div>

    <section class="section tight">
      <h2>Manufacturer &amp; Rockets</h2>
      <RelatedLinks :links="relatedLinks" heading="Used by" />
    </section>

    <section v-if="engine.sourceUrls.length" class="section tight">
      <h2>Sources</h2>
      <ul class="linklist">
        <li v-for="url in engine.sourceUrls" :key="url">
          <a :href="url" target="_blank" rel="noopener noreferrer">{{ url }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Engine, EngineCycle } from '~/types';
import type { FactRow } from '~/components/EntityTable.vue';
import type { RelatedLink } from '~/components/RelatedLinks.vue';
import { entityLink } from '~/utils/links';
import { fmtCountry, fmtThrust, fmtIsp, fmtNum } from '~/utils/units';
import { applySeo, entityTitle, entityJsonLd } from '~/utils/seo';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: engine } = await useEngine(slug);
if (!engine.value) {
  throw createError({ statusCode: 404, statusMessage: 'Engine not found', fatal: true });
}

const e = engine.value as Engine;
const path = `/engines/${e.slug}`;

applySeo({
  title: entityTitle(e.name, 'engine'),
  description: e.description.slice(0, 155),
  path,
});
entityJsonLd({ name: e.name, description: e.description, path, lastUpdated: e.lastUpdated });

const { data: companies } = useCompanies();
const { data: rockets } = useRockets();

const companyMap = computed(() => new Map((companies.value ?? []).map((c) => [c.slug, c])));
const rocketMap = computed(() => new Map((rockets.value ?? []).map((r) => [r.slug, r])));

const factRows = computed<FactRow[]>(() => [
  { key: 'country', label: 'Country', value: e.country, display: fmtCountry(e.country) },
  { key: 'manufacturer', label: 'Manufacturer', value: e.manufacturerSlug, display: companyMap.value.get(e.manufacturerSlug)?.name ?? 'Unknown' },
  { key: 'cycle', label: 'Cycle', value: e.cycle, display: cycleLabel(e.cycle) },
  { key: 'propellants', label: 'Propellants', value: e.propellants, display: e.propellants.join(' / ') || 'Unknown' },
  { key: 'thrustSea', label: 'Thrust (sea level)', value: e.thrustSeaKn, display: fmtThrust(e.thrustSeaKn) },
  { key: 'thrustVac', label: 'Thrust (vacuum)', value: e.thrustVacKn, display: fmtThrust(e.thrustVacKn) },
  { key: 'ispSea', label: 'Isp (sea level)', value: e.ispSeaS, display: fmtIsp(e.ispSeaS) },
  { key: 'ispVac', label: 'Isp (vacuum)', value: e.ispVacS, display: fmtIsp(e.ispVacS) },
  { key: 'reusable', label: 'Reusable', value: e.reusable, display: e.reusable ? 'Yes' : 'No' },
  { key: 'rockets', label: 'Used on', value: e.rocketSlugs.length, display: fmtNum(e.rocketSlugs.length) },
]);

const relatedLinks = computed<RelatedLink[]>(() => {
  const links: RelatedLink[] = [];
  const mfr = companyMap.value.get(e.manufacturerSlug);
  if (mfr) links.push(entityLink('company', mfr.slug, mfr.name, 'Manufacturer'));
  for (const s of e.rocketSlugs) {
    const r = rocketMap.value.get(s);
    links.push(entityLink('rocket', s, r?.name, 'Used on'));
  }
  return links;
});

function cycleLabel(c: EngineCycle): string {
  return c.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
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
