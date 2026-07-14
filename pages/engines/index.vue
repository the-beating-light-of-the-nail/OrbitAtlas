<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'Engines' }]" />
    <h1>Rocket Engines</h1>
    <p class="lead">
      Liquid and solid rocket engines used by orbital launch vehicles — with
      cycle, propellants, thrust, specific impulse, and the rockets that use
      them.
    </p>

    <div v-if="pending" class="empty">Loading engines…</div>
    <div v-else class="grid grid-3">
      <EntityCard
        v-for="e in engines"
        :key="e.slug"
        :to="`/engines/${e.slug}`"
        :title="e.name"
        :subtitle="`${fmtCountry(e.country)} · ${cycleLabel(e.cycle)}`"
        :description="e.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EngineCycle } from '~/types';
import { fmtCountry } from '~/utils/units';
import { applySeo, sectionTitle } from '~/utils/seo';

applySeo({
  title: sectionTitle('Engines'),
  description:
    'Rocket engines used by orbital launch vehicles — Merlin, Raptor, YF-100, TQ-12, BE-4 and more, with cycle, propellants, thrust, and Isp.',
  path: '/engines',
});

const { data: engines, pending } = useEngines();

function cycleLabel(c: EngineCycle): string {
  return c
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
}
</script>
