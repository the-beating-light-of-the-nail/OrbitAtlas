<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'China Space Program', to: '/china-space-program' }, { label: 'Moon Program' }]" />
    <h1>China Moon Program</h1>
    <p class="lead">
      China's lunar program spans robotic exploration (Chang'e sample return
      and far-side missions) and a planned crewed lunar landing in the late
      2020s using the Long March 10 rocket, the Mengzhou crew spacecraft, and
      the Lanyue lunar lander.
    </p>

    <section class="section tight">
      <h2>Key Rocket</h2>
      <div class="grid grid-3">
        <EntityCard
          v-for="r in moonRockets"
          :key="r.slug"
          :to="`/rockets/${r.slug}`"
          :title="r.name"
          :subtitle="`LEO ${fmtMass(r.payloadToLeoKg)}`"
          :description="r.description"
        />
      </div>
    </section>

    <section class="section tight">
      <h2>Related Launches</h2>
      <div class="grid grid-2">
        <EntityCard
          v-for="l in moonLaunches"
          :key="l.slug"
          :to="`/launches/${l.slug}`"
          :title="l.name"
          :subtitle="formatDateTime(l.launchDate)"
          :description="l.description"
        />
      </div>
    </section>

    <section class="section tight">
      <h2>Related Comparison</h2>
      <p>
        <NuxtLink to="/compare/spacex-vs-chinese-commercial-space">SpaceX vs Chinese commercial space →</NuxtLink>
      </p>
    </section>

    <div class="note" style="margin-top: 16px">
      Crewed lunar landing dates are plans, not confirmed achievements; treat
      as schedule targets.
    </div>
  </div>
</template>

<script setup lang="ts">
import { fmtMass } from '~/utils/units';
import { formatDateTime } from '~/utils/dates';
import { applySeo } from '~/utils/seo';

applySeo({
  title: 'China Moon Program | OrbitAtlas',
  description:
    "China's Moon program in data — Chang'e lunar sample return missions, the Long March 10 crewed lunar rocket, Mengzhou spacecraft, and Lanyue lander.",
  path: '/china/moon-program',
});

const { data: rockets } = useRockets();
const { data: launches } = useLaunches();

const moonRockets = computed(() => (rockets.value ?? []).filter((r) => r.slug === 'long-march-10'));
const moonLaunches = computed(() => (launches.value ?? []).filter((l) => l.orbit === 'TLI' && l.isChinaProgram));
</script>
