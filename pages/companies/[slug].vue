<template>
  <div v-if="company">
    <Breadcrumbs :crumbs="[{ label: 'Companies', to: '/companies' }, { label: company.name }]" />
    <div class="split">
      <div>
        <h1>{{ company.name }}</h1>
        <p class="lead">{{ company.description }}</p>
        <div class="tag-row">
          <Tag :label="fmtCountry(company.country)" />
          <Tag :label="typeLabel(company.type)" variant="dim" />
          <Tag v-if="company.founded" :label="`Founded ${company.founded}`" variant="dim" />
        </div>
        <p v-if="company.website">
          <a :href="company.website" target="_blank" rel="noopener noreferrer">{{ company.website }}</a>
        </p>
      </div>
      <div>
        <EntityTable :rows="factRows" />
      </div>
    </div>

    <section class="section tight">
      <h2>Rockets</h2>
      <RelatedLinks :links="rocketLinks" heading="Rockets by this company" />
    </section>

    <section class="section tight">
      <h2>Missions &amp; Programs</h2>
      <RelatedLinks :links="missionLinks" heading="Programs operated" />
    </section>

    <section class="section tight">
      <h2>Launches</h2>
      <RelatedLinks :links="launchLinks" heading="Launches by this company" />
    </section>

    <section v-if="company.sourceUrls.length" class="section tight">
      <h2>Sources</h2>
      <ul class="linklist">
        <li v-for="url in company.sourceUrls" :key="url">
          <a :href="url" target="_blank" rel="noopener noreferrer">{{ url }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Company, CompanyType } from '~/types';
import type { FactRow } from '~/components/EntityTable.vue';
import type { RelatedLink } from '~/components/RelatedLinks.vue';
import { entityLink } from '~/utils/links';
import { fmtCountry } from '~/utils/units';
import { applySeo, entityTitle, entityJsonLd } from '~/utils/seo';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: company } = await useCompany(slug);
if (!company.value) {
  throw createError({ statusCode: 404, statusMessage: 'Company not found', fatal: true });
}

const c = company.value as Company;
const path = `/companies/${c.slug}`;

applySeo({
  title: entityTitle(c.name, 'company'),
  description: c.description.slice(0, 155),
  path,
});
entityJsonLd({ name: c.name, description: c.description, path, lastUpdated: c.lastUpdated });

const { data: rockets } = useRockets();
const { data: launches } = useLaunches();
const { data: missions } = useMissions();

const rocketMap = computed(() => new Map((rockets.value ?? []).map((r) => [r.slug, r])));

const factRows = computed<FactRow[]>(() => [
  { key: 'country', label: 'Country', value: c.country, display: fmtCountry(c.country) },
  { key: 'type', label: 'Type', value: c.type, display: typeLabel(c.type) },
  { key: 'founded', label: 'Founded', value: c.founded, display: c.founded ?? 'Unknown' },
  { key: 'hq', label: 'Headquarters', value: c.headquarters, display: c.headquarters ?? 'Unknown' },
  { key: 'rockets', label: 'Rockets', value: c.rocketSlugs.length, display: String(c.rocketSlugs.length) },
]);

const rocketLinks = computed<RelatedLink[]>(() =>
  c.rocketSlugs.map((s) => entityLink('rocket', s, rocketMap.value.get(s)?.name)),
);

const missionLinks = computed<RelatedLink[]>(() =>
  (missions.value ?? [])
    .filter((m) => m.operatorSlug === c.slug)
    .map((m) => entityLink('mission', m.slug, m.name)),
);

const launchLinks = computed<RelatedLink[]>(() =>
  (launches.value ?? [])
    .filter((l) => l.companySlug === c.slug)
    .map((l) => entityLink('launch', l.slug, l.name)),
);

function typeLabel(t: CompanyType): string {
  return {
    state: 'State',
    private: 'Private',
    'state-owned-enterprise': 'State-owned enterprise',
    agency: 'Agency',
    consortium: 'Consortium',
  }[t];
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
