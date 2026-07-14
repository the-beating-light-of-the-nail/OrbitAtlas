<template>
  <div>
    <div class="hero">
      <div class="container">
        <h1>China Space Program</h1>
        <p class="lead">
          A neutral, data-driven overview of China's space launch capability —
          rockets, companies, launch sites, reusable-vehicle development, the
          crewed Moon program, and the Tiangong space station.
        </p>
      </div>
    </div>

    <section class="section container">
      <p>
        China operates one of the world's most active launch programs through
        state-owned enterprises led by CASC and a growing private commercial
        sector. The Long March family remains the backbone of national launches,
        while companies such as LandSpace and Galactic Energy expand small and
        medium-lift capacity, including China's first reusable and
        liquid-oxygen/methane rockets.
      </p>
      <div class="grid grid-4">
        <EntityCard to="/china/rockets" title="Chinese Rockets" subtitle="Long March, Zhuque & more" />
        <EntityCard to="/china/companies" title="Chinese Companies" subtitle="CASC, LandSpace & others" />
        <EntityCard to="/china/launches" title="Chinese Launches" subtitle="Recent and notable" />
        <EntityCard to="/china/launch-sites" title="Launch Sites" subtitle="Wenchang, Jiuquan & more" />
        <EntityCard to="/china/reusable-rockets" title="Reusable Rockets" subtitle="China's reuse programs" />
        <EntityCard to="/china/moon-program" title="Moon Program" subtitle="Crewed lunar plans" />
        <EntityCard to="/china/space-station" title="Space Station" subtitle="Tiangong program" />
        <EntityCard to="/compare/spacex-vs-chinese-commercial-space" title="SpaceX vs Chinese Commercial Space" subtitle="Comparison" />
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <h2>Featured Chinese Rockets</h2>
        <NuxtLink to="/china/rockets">All Chinese rockets →</NuxtLink>
      </div>
      <div class="grid grid-3">
        <EntityCard
          v-for="r in chinaRockets.slice(0, 6)"
          :key="r.slug"
          :to="`/rockets/${r.slug}`"
          :title="r.name"
          :subtitle="r.reusable ? 'Reusable' : 'Expendable'"
          :description="r.description"
        />
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <h2>Recent Chinese Launches</h2>
        <NuxtLink to="/china/launches">All Chinese launches →</NuxtLink>
      </div>
      <div class="grid grid-3">
        <EntityCard
          v-for="l in chinaLaunches.slice(0, 6)"
          :key="l.slug"
          :to="`/launches/${l.slug}`"
          :title="l.name"
          :subtitle="formatDateTime(l.launchDate)"
          :description="l.description"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from '~/utils/dates';
import { applySeo } from '~/utils/seo';

applySeo({
  title: 'China Space Program | OrbitAtlas',
  description:
    "China's space program in data — Long March rockets, commercial launch companies, reusable rockets, launch sites, the crewed Moon program, and the Tiangong space station.",
  path: '/china-space-program',
});

const { data: rockets } = useRockets();
const { data: launches } = useLaunches();

const chinaRockets = computed(() => (rockets.value ?? []).filter((r) => r.isChinaProgram));
const chinaLaunches = computed(() => (launches.value ?? []).filter((l) => l.isChinaProgram));
</script>
