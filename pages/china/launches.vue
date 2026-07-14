<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'China Space Program', to: '/china-space-program' }, { label: 'Launches' }]" />
    <h1>Chinese Launches</h1>
    <p class="lead">
      Notable Chinese orbital launches — sorted newest first — with rocket,
      launch site, payloads, and links to each entity.
    </p>
    <div class="grid grid-2">
      <EntityCard
        v-for="l in launches"
        :key="l.slug"
        :to="`/launches/${l.slug}`"
        :title="l.name"
        :subtitle="formatDateTime(l.launchDate)"
        :description="l.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from '~/utils/dates';
import { applySeo } from '~/utils/seo';

applySeo({
  title: 'Chinese Launches | OrbitAtlas',
  description:
    'Notable Chinese rocket launches in data — Chang\'e 6, Tiangong module launches, Long March 8 missions, Zhuque-2 and more, with rocket, site, and payloads.',
  path: '/china/launches',
});

const { data: all } = useLaunches();
const launches = computed(() => (all.value ?? []).filter((l) => l.isChinaProgram));
</script>
