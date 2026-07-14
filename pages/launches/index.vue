<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'Launches' }]" />
    <h1>Launches</h1>
    <p class="lead">
      Orbital and notable suborbital launches, sorted newest first. Each page
      links the rocket, launch site, operator, payloads, and any recovery.
    </p>

    <div v-if="pending" class="empty">Loading launches…</div>
    <div v-else class="grid grid-2">
      <EntityCard
        v-for="l in launches"
        :key="l.slug"
        :to="`/launches/${l.slug}`"
        :title="l.name"
        :subtitle="formatDateTime(l.launchDate)"
        :description="l.description"
        :tag="launchStatusTag(l.status)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LaunchStatus } from '~/types';
import { formatDateTime } from '~/utils/dates';
import { applySeo, sectionTitle } from '~/utils/seo';

applySeo({
  title: sectionTitle('Launches'),
  description:
    'A database of rocket launches worldwide — launch date, rocket, site, operator, payloads, orbit, and recovery, with internal links to each entity.',
  path: '/launches',
});

const { data: launches, pending } = useLaunches();

function launchStatusTag(status: LaunchStatus) {
  const map: Record<LaunchStatus, { label: string; variant: 'ok' | 'warn' | 'danger' | 'dim' }> = {
    success: { label: 'Success', variant: 'ok' },
    failure: { label: 'Failure', variant: 'danger' },
    'partial-failure': { label: 'Partial failure', variant: 'warn' },
    planned: { label: 'Planned', variant: 'warn' },
    'in-flight': { label: 'In flight', variant: 'ok' },
    scrubbed: { label: 'Scrubbed', variant: 'dim' },
  };
  return map[status];
}
</script>
