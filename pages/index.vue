<template>
  <div>
    <section class="hero">
      <div class="container">
        <h1>OrbitAtlas — Space Launch &amp; Rocket Database</h1>
        <p class="lead">
          A structured, entity-first database of rockets, launches, missions,
          companies, engines, and launch sites around the world — with a
          dedicated focus on the China Space Program.
        </p>
        <div class="hero-actions">
          <NuxtLink class="btn primary" to="/rockets">Browse Rockets</NuxtLink>
          <NuxtLink class="btn" to="/china-space-program">China Space Program</NuxtLink>
          <NuxtLink class="btn" to="/compare">Compare Rockets</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <h2>Featured Rockets</h2>
        <NuxtLink to="/rockets">All rockets →</NuxtLink>
      </div>
      <div v-if="pending" class="empty">Loading rockets…</div>
      <div v-else class="grid grid-4">
        <EntityCard
          v-for="r in featuredRockets"
          :key="r.slug"
          :to="`/rockets/${r.slug}`"
          :title="r.name"
          :subtitle="fmtCountry(r.country)"
          :description="r.description"
          :tag="statusTag(r.status)"
        />
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <h2>Latest Launches</h2>
        <NuxtLink to="/launches">All launches →</NuxtLink>
      </div>
      <div v-if="launchesPending" class="empty">Loading launches…</div>
      <div v-else class="grid grid-3">
        <EntityCard
          v-for="l in latestLaunches"
          :key="l.slug"
          :to="`/launches/${l.slug}`"
          :title="l.name"
          :subtitle="formatDateTime(l.launchDate)"
          :description="l.description"
          :tag="launchStatusTag(l.status)"
        />
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <h2>China Space Program</h2>
        <NuxtLink to="/china-space-program">Explore →</NuxtLink>
      </div>
      <p class="lead">
        A neutral, data-driven section covering Chinese rockets, companies,
        reusable launch vehicles, the Moon program, and the Tiangong space
        station.
      </p>
      <div class="grid grid-4">
        <EntityCard to="/china/rockets" title="Chinese Rockets" subtitle="Long March, Zhuque & more" />
        <EntityCard to="/china/companies" title="Chinese Companies" subtitle="CASC, LandSpace & others" />
        <EntityCard to="/china/reusable-rockets" title="Reusable Rockets" subtitle="China's reuse programs" />
        <EntityCard to="/china/moon-program" title="Moon Program" subtitle="Crewed lunar plans" />
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <h2>Compare</h2>
        <NuxtLink to="/compare">All comparisons →</NuxtLink>
      </div>
      <div v-if="comparesPending" class="empty">Loading…</div>
      <div v-else class="grid grid-3">
        <EntityCard
          v-for="c in compares"
          :key="c.slug"
          :to="`/compare/${c.slug}`"
          :title="c.name"
          :subtitle="c.summary.slice(0, 90) + '…'"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { RocketStatus, LaunchStatus } from '~/types';
import { fmtCountry } from '~/utils/units';
import { formatDateTime } from '~/utils/dates';
import { applySeo } from '~/utils/seo';

applySeo({
  title: 'OrbitAtlas — Space Launch & Rocket Database',
  description:
    'Track rockets, launches, missions, companies, engines, and launch sites worldwide. A structured space database with a dedicated China Space Program section.',
  path: '/',
});

const FEATURED = ['falcon-9', 'starship', 'long-march-5', 'zhuque-3'];

const { data: rockets, pending } = useRockets();
const { data: launches, pending: launchesPending } = useLaunches();
const { data: compares, pending: comparesPending } = useCompares();

const featuredRockets = computed(() => {
  const list = rockets.value ?? [];
  return FEATURED.map((slug) => list.find((r) => r.slug === slug)).filter(
    (r): r is NonNullable<typeof r> => !!r,
  );
});

const latestLaunches = computed(() => (launches.value ?? []).slice(0, 6));

function statusTag(status: RocketStatus) {
  const map: Record<RocketStatus, { label: string; variant: 'ok' | 'warn' | 'danger' | 'dim' }> = {
    active: { label: 'Active', variant: 'ok' },
    'in-development': { label: 'In development', variant: 'warn' },
    retired: { label: 'Retired', variant: 'dim' },
    cancelled: { label: 'Cancelled', variant: 'danger' },
  };
  return map[status];
}

function launchStatusTag(status: LaunchStatus) {
  const map: Record<LaunchStatus, { label: string; variant: 'ok' | 'warn' | 'danger' | 'dim' }> = {
    success: { label: 'Success', variant: 'ok' },
    failure: { label: 'Failure', variant: 'danger' },
    'partial-failure': { label: 'Partial failure', variant: 'warn' },
    planned: { label: 'Planned', variant: 'warn' },
    'in-flight': { label: 'In flight', variant: 'ok' },
    scrubbed: { label: 'Scrubbed', variant: 'dim' },
  };
  return map[status];
}
</script>

<style scoped>
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}
</style>
