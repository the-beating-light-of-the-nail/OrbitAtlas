<template>
  <div v-if="mission">
    <Breadcrumbs :crumbs="[{ label: 'Missions', to: '/missions' }, { label: mission.name }]" />
    <div class="split">
      <div>
        <h1>{{ mission.name }}</h1>
        <p class="lead">{{ mission.description }}</p>
        <div class="tag-row">
          <Tag :label="fmtCountry(mission.country)" />
          <Tag :label="typeLabel(mission.type)" variant="dim" />
          <Tag v-if="mission.isChinaProgram" label="China program" />
        </div>
      </div>
      <div>
        <EntityTable :rows="factRows" />
      </div>
    </div>

    <section class="section tight">
      <h2>Operator</h2>
      <RelatedLinks :links="operatorLinks" heading="Operated by" />
    </section>

    <section class="section tight">
      <h2>Launches</h2>
      <RelatedLinks :links="launchLinks" heading="Launches in this program" />
    </section>

    <section v-if="mission.sourceUrls.length" class="section tight">
      <h2>Sources</h2>
      <ul class="linklist">
        <li v-for="url in mission.sourceUrls" :key="url">
          <a :href="url" target="_blank" rel="noopener noreferrer">{{ url }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Mission, MissionType } from '~/types';
import type { FactRow } from '~/components/EntityTable.vue';
import type { RelatedLink } from '~/components/RelatedLinks.vue';
import { entityLink } from '~/utils/links';
import { fmtCountry } from '~/utils/units';
import { formatDate } from '~/utils/dates';
import { applySeo, entityTitle, entityJsonLd } from '~/utils/seo';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: mission } = await useMission(slug);
if (!mission.value) {
  throw createError({ statusCode: 404, statusMessage: 'Mission not found', fatal: true });
}

const m = mission.value as Mission;
const path = `/missions/${m.slug}`;

applySeo({
  title: entityTitle(m.name, 'mission'),
  description: m.description.slice(0, 155),
  path,
});
entityJsonLd({ name: m.name, description: m.description, path, lastUpdated: m.lastUpdated });

const { data: companies } = useCompanies();
const { data: launches } = useLaunches();

const companyMap = computed(() => new Map((companies.value ?? []).map((c) => [c.slug, c])));

const factRows = computed<FactRow[]>(() => [
  { key: 'country', label: 'Country', value: m.country, display: fmtCountry(m.country) },
  { key: 'operator', label: 'Operator', value: m.operatorSlug, display: m.operatorSlug ? (companyMap.value.get(m.operatorSlug)?.name ?? 'Unknown') : 'Unknown' },
  { key: 'type', label: 'Type', value: m.type, display: typeLabel(m.type) },
  { key: 'target', label: 'Target', value: m.target, display: m.target ?? 'Unknown' },
  { key: 'launches', label: 'Recorded launches', value: m.launchSlugs.length, display: String(m.launchSlugs.length) },
]);

const operatorLinks = computed<RelatedLink[]>(() => {
  if (!m.operatorSlug) return [];
  const op = companyMap.value.get(m.operatorSlug);
  return op ? [entityLink('company', op.slug, op.name, 'Operator')] : [];
});

const launchLinks = computed<RelatedLink[]>(() =>
  (launches.value ?? [])
    .filter((l) => m.launchSlugs.includes(l.slug))
    .map((l) => entityLink('launch', l.slug, l.name, formatDate(l.launchDate))),
);

function typeLabel(t: MissionType): string {
  return t.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
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
