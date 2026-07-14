<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'Launch Sites' }]" />
    <h1>Launch Sites</h1>
    <p class="lead">
      Orbital launch ranges and spaceports worldwide — with location,
      operator, status, and the rockets that fly from them.
    </p>

    <div v-if="pending" class="empty">Loading launch sites…</div>
    <div v-else class="grid grid-3">
      <EntityCard
        v-for="s in sites"
        :key="s.slug"
        :to="`/launch-sites/${s.slug}`"
        :title="s.name"
        :subtitle="`${fmtCountry(s.country)} · ${s.location.lat.toFixed(2)}, ${s.location.lon.toFixed(2)}`"
        :description="s.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { fmtCountry } from '~/utils/units';
import { applySeo, sectionTitle } from '~/utils/seo';

applySeo({
  title: sectionTitle('Launch Sites'),
  description:
    'Orbital launch sites and spaceports worldwide — Starbase, Cape Canaveral, Kennedy Space Center, Wenchang, Mahia and more.',
  path: '/launch-sites',
});

const { data: sites, pending } = useLaunchSites();
</script>
