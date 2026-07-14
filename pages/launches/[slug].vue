<template>
  <div v-if="launch">
    <Breadcrumbs :crumbs="[{ label: 'Launches', to: '/launches' }, { label: launch.name }]" />
    <div class="split">
      <div>
        <h1>{{ launch.name }}</h1>
        <p class="lead">{{ launch.description }}</p>
        <div class="tag-row">
          <Tag :label="statusLabel(launch.status)" :variant="statusVariant(launch.status)" />
          <Tag :label="launch.orbit ?? 'Unknown orbit'" variant="dim" />
          <Tag v-if="launch.isChinaProgram" label="China program" />
        </div>
        <p v-if="launch.webcastUrl">
          <a :href="launch.webcastUrl" target="_blank" rel="noopener noreferrer">Watch webcast →</a>
        </p>
      </div>
      <div>
        <EntityTable :rows="factRows" />
      </div>
    </div>

    <section v-if="launch.payloads.length" class="section tight">
      <h2>Payloads</h2>
      <table class="facts">
        <thead>
          <tr>
            <th class="label">Name</th>
            <th>Type</th>
            <th>Mass</th>
            <th>Orbit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in launch.payloads" :key="p.name">
            <td class="label">{{ p.name }}</td>
            <td>{{ p.type }}</td>
            <td>{{ fmtMass(p.massKg) }}</td>
            <td>{{ p.orbit ?? 'Unknown' }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="section tight">
      <h2>Related</h2>
      <RelatedLinks :links="relatedLinks" heading="Rocket, site, operator &amp; mission" />
    </section>

    <section v-if="launch.sourceUrls.length" class="section tight">
      <h2>Sources</h2>
      <ul class="linklist">
        <li v-for="url in launch.sourceUrls" :key="url">
          <a :href="url" target="_blank" rel="noopener noreferrer">{{ url }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Launch, LaunchStatus } from '~/types';
import type { FactRow } from '~/components/EntityTable.vue';
import type { RelatedLink } from '~/components/RelatedLinks.vue';
import { entityLink } from '~/utils/links';
import { fmtMass } from '~/utils/units';
import { formatDateTime } from '~/utils/dates';
import { applySeo, entityTitle, entityJsonLd } from '~/utils/seo';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: launch } = await useLaunch(slug);
if (!launch.value) {
  throw createError({ statusCode: 404, statusMessage: 'Launch not found', fatal: true });
}

const l = launch.value as Launch;
const path = `/launches/${l.slug}`;

applySeo({
  title: entityTitle(l.name, 'launch'),
  description: l.description.slice(0, 155),
  path,
});
entityJsonLd({ name: l.name, description: l.description, path, lastUpdated: l.lastUpdated });

const { data: rockets } = useRockets();
const { data: companies } = useCompanies();
const { data: sites } = useLaunchSites();
const { data: missions } = useMissions();

const rocketMap = computed(() => new Map((rockets.value ?? []).map((r) => [r.slug, r])));
const companyMap = computed(() => new Map((companies.value ?? []).map((c) => [c.slug, c])));
const siteMap = computed(() => new Map((sites.value ?? []).map((s) => [s.slug, s])));
const missionMap = computed(() => new Map((missions.value ?? []).map((m) => [m.slug, m])));

const factRows = computed<FactRow[]>(() => [
  { key: 'date', label: 'Launch date', value: l.launchDate, display: formatDateTime(l.launchDate) },
  { key: 'rocket', label: 'Rocket', value: l.rocketSlug, display: rocketMap.value.get(l.rocketSlug)?.name ?? 'Unknown' },
  { key: 'site', label: 'Launch site', value: l.launchSiteSlug, display: siteMap.value.get(l.launchSiteSlug)?.name ?? 'Unknown' },
  { key: 'operator', label: 'Operator', value: l.companySlug, display: companyMap.value.get(l.companySlug)?.name ?? 'Unknown' },
  { key: 'status', label: 'Status', value: l.status, display: statusLabel(l.status) },
  { key: 'orbit', label: 'Orbit', value: l.orbit, display: l.orbit ?? 'Unknown' },
  { key: 'mission', label: 'Mission', value: l.missionSlug, display: l.missionSlug ? (missionMap.value.get(l.missionSlug)?.name ?? 'Unknown') : 'None' },
  { key: 'flight', label: 'Flight number', value: l.flightNumber, display: l.flightNumber != null ? String(l.flightNumber) : '—' },
  { key: 'recovery', label: 'Recovery', value: l.recovery, display: l.recovery ? `${recoveryTypeLabel(l.recovery.type)} (${l.recovery.status})` : 'None' },
]);

const relatedLinks = computed<RelatedLink[]>(() => {
  const links: RelatedLink[] = [];
  const rocket = rocketMap.value.get(l.rocketSlug);
  if (rocket) links.push(entityLink('rocket', rocket.slug, rocket.name, 'Rocket'));
  const site = siteMap.value.get(l.launchSiteSlug);
  if (site) links.push(entityLink('launch-site', site.slug, site.name, 'Launch site'));
  const operator = companyMap.value.get(l.companySlug);
  if (operator) links.push(entityLink('company', operator.slug, operator.name, 'Operator'));
  if (l.missionSlug) {
    const mission = missionMap.value.get(l.missionSlug);
    links.push(entityLink('mission', l.missionSlug, mission?.name, 'Mission'));
  }
  return links;
});

function statusLabel(s: LaunchStatus): string {
  return { success: 'Success', failure: 'Failure', 'partial-failure': 'Partial failure', planned: 'Planned', 'in-flight': 'In flight', scrubbed: 'Scrubbed' }[s];
}
function statusVariant(s: LaunchStatus): 'ok' | 'warn' | 'danger' | 'dim' {
  return ({ success: 'ok', failure: 'danger', 'partial-failure': 'warn', planned: 'warn', 'in-flight': 'ok', scrubbed: 'dim' } as const)[s];
}
function recoveryTypeLabel(t: string): string {
  return { droneship: 'Droneship', rtls: 'Return to launch site', catch: 'Mid-air catch', parachute: 'Parachute', none: 'None' }[t] ?? t;
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
