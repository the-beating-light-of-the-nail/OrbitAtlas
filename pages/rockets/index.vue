<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'Rockets' }]" />
    <h1>Rockets</h1>
    <p class="lead">
      Orbital launch vehicles worldwide — from Falcon 9 and Starship to the
      Long March and Zhuque families. Each page lists key facts, engines,
      manufacturer, and launch history.
    </p>

    <div v-if="pending" class="empty">Loading rockets…</div>
    <div v-else class="grid grid-3">
      <EntityCard
        v-for="r in rockets"
        :key="r.slug"
        :to="`/rockets/${r.slug}`"
        :title="r.name"
        :subtitle="`${fmtCountry(r.country)} · ${fmtLength(r.heightM)}`"
        :description="r.description"
        :tag="statusTag(r.status)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RocketStatus } from '~/types';
import { fmtCountry, fmtLength } from '~/utils/units';
import { applySeo, sectionTitle } from '~/utils/seo';

applySeo({
  title: sectionTitle('Rockets'),
  description:
    'A database of orbital rockets worldwide — Falcon 9, Starship, Long March, Zhuque, New Glenn, Electron, Ariane 6 and more, with key facts and launch history.',
  path: '/rockets',
});

const { data: rockets, pending } = useRockets();

function statusTag(status: RocketStatus) {
  const map: Record<RocketStatus, { label: string; variant: 'ok' | 'warn' | 'danger' | 'dim' }> = {
    active: { label: 'Active', variant: 'ok' },
    'in-development': { label: 'In development', variant: 'warn' },
    retired: { label: 'Retired', variant: 'dim' },
    cancelled: { label: 'Cancelled', variant: 'danger' },
  };
  return map[status];
}
</script>
