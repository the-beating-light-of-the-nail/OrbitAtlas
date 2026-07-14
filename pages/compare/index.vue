<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'Compare' }]" />
    <h1>Compare</h1>
    <p class="lead">
      Side-by-side comparisons of rockets, engines, companies, and programs —
      with structured comparison tables, similarities, differences, and FAQ.
    </p>
    <div v-if="pending" class="empty">Loading comparisons…</div>
    <div v-else class="grid grid-2">
      <EntityCard
        v-for="c in compares"
        :key="c.slug"
        :to="`/compare/${c.slug}`"
        :title="c.name"
        :subtitle="c.summary.slice(0, 110) + '…'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { applySeo, sectionTitle } from '~/utils/seo';

applySeo({
  title: sectionTitle('Compare'),
  description:
    'Rocket, engine, and company comparisons — Falcon 9 vs Long March 8, Starship vs Zhuque-3, SpaceX vs Chinese commercial space, and more.',
  path: '/compare',
});

const { data: compares, pending } = useCompares();
</script>
