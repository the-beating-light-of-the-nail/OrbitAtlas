<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'China Space Program', to: '/china-space-program' }, { label: 'Launch Sites' }]" />
    <h1>Chinese Launch Sites</h1>
    <p class="lead">
      China's orbital launch ranges — including the coastal heavy-lift base at
      Wenchang and the inland Jiuquan site used for crewed and commercial
      launches.
    </p>
    <div class="grid grid-3">
      <EntityCard
        v-for="s in sites"
        :key="s.slug"
        :to="`/launch-sites/${s.slug}`"
        :title="s.name"
        :subtitle="`${s.location.lat.toFixed(2)}, ${s.location.lon.toFixed(2)}`"
        :description="s.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { applySeo } from '~/utils/seo';

applySeo({
  title: 'Chinese Launch Sites | OrbitAtlas',
  description:
    "Chinese launch sites in data — Wenchang Spacecraft Launch Site and Jiuquan Satellite Launch Center, with location, operator, and status.",
  path: '/china/launch-sites',
});

const { data: all } = useLaunchSites();
const sites = computed(() => (all.value ?? []).filter((s) => s.isChinaProgram));
</script>
