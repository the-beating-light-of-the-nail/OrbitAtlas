<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'Missions' }]" />
    <h1>Missions &amp; Programs</h1>
    <p class="lead">
      Recurring and flagship space programs — constellations, lunar programs,
      and national projects — and the launches that belong to them.
    </p>

    <div v-if="pending" class="empty">Loading missions…</div>
    <div v-else class="grid grid-3">
      <EntityCard
        v-for="m in missions"
        :key="m.slug"
        :to="`/missions/${m.slug}`"
        :title="m.name"
        :subtitle="`${fmtCountry(m.country)} · ${typeLabel(m.type)}`"
        :description="m.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MissionType } from '~/types';
import { fmtCountry } from '~/utils/units';
import { applySeo, sectionTitle } from '~/utils/seo';

applySeo({
  title: sectionTitle('Missions'),
  description:
    'Space missions and programs — Starlink, Artemis, Tiangong and more — with linked launches, operators, and target orbits.',
  path: '/missions',
});

const { data: missions, pending } = useMissions();

function typeLabel(t: MissionType): string {
  return t
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
}
</script>
