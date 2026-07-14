<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'China Space Program', to: '/china-space-program' }, { label: 'Rockets' }]" />
    <h1>Chinese Rockets</h1>
    <p class="lead">
      Rockets developed and flown by China — the Long March (Chang Zheng)
      family from CASC and commercial vehicles such as LandSpace's Zhuque.
    </p>
    <div class="grid grid-3">
      <EntityCard
        v-for="r in rockets"
        :key="r.slug"
        :to="`/rockets/${r.slug}`"
        :title="r.name"
        :subtitle="r.reusable ? 'Reusable' : 'Expendable'"
        :description="r.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { applySeo } from '~/utils/seo';

applySeo({
  title: 'Chinese Rockets | OrbitAtlas',
  description:
    'Chinese rockets in data — Long March 5, 8, 10 and commercial vehicles Zhuque-2 and Zhuque-3, with key facts, engines, and launch history.',
  path: '/china/rockets',
});

const { data: all } = useRockets();
const rockets = computed(() => (all.value ?? []).filter((r) => r.isChinaProgram));
</script>
