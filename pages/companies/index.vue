<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'Companies' }]" />
    <h1>Companies &amp; Organisations</h1>
    <p class="lead">
      Space agencies, state-owned enterprises, and private launch companies
      that build and operate rockets, spacecraft, and engines.
    </p>

    <div v-if="pending" class="empty">Loading companies…</div>
    <div v-else class="grid grid-3">
      <EntityCard
        v-for="c in companies"
        :key="c.slug"
        :to="`/companies/${c.slug}`"
        :title="c.name"
        :subtitle="`${fmtCountry(c.country)} · ${typeLabel(c.type)}`"
        :description="c.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CompanyType } from '~/types';
import { fmtCountry } from '~/utils/units';
import { applySeo, sectionTitle } from '~/utils/seo';

applySeo({
  title: sectionTitle('Companies'),
  description:
    'Space companies and organisations worldwide — SpaceX, NASA, CASC, LandSpace, Rocket Lab, Blue Origin, Arianespace and more.',
  path: '/companies',
});

const { data: companies, pending } = useCompanies();

function typeLabel(t: CompanyType): string {
  return {
    state: 'State',
    private: 'Private',
    'state-owned-enterprise': 'State-owned enterprise',
    agency: 'Agency',
    consortium: 'Consortium',
  }[t];
}
</script>
