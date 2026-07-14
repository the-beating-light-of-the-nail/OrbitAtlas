<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'China Space Program', to: '/china-space-program' }, { label: 'Space Station' }]" />
    <h1>Tiangong Space Station</h1>
    <p class="lead">
      China's Tiangong space station is a modular, permanently crewed orbital
      outpost assembled from the Tianhe core module and the Wentian and
      Mengtian experiment modules, resupplied by Tianzhou cargo vehicles and
      rotated by Shenzhou crews.
    </p>

    <section class="section tight">
      <h2>Program</h2>
      <p>
        <NuxtLink to="/missions/tiangong">Tiangong Space Station Program →</NuxtLink>
      </p>
    </section>

    <section class="section tight">
      <h2>Related Launches</h2>
      <div class="grid grid-2">
        <EntityCard
          v-for="l in stationLaunches"
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
  title: 'Tiangong Space Station | OrbitAtlas',
  description:
    "China's Tiangong space station program in data — the Tianhe core module, assembly launches, Tianzhou cargo, and Shenzhou crew rotations.",
  path: '/china/space-station',
});

const { data: launches } = useLaunches();
const { data: missions } = useMissions();

const stationLaunches = computed(() => {
  const stationMission = (missions.value ?? []).find((m) => m.slug === 'tiangong');
  if (!stationMission) return [];
  return (launches.value ?? []).filter((l) => stationMission.launchSlugs.includes(l.slug));
});
</script>
