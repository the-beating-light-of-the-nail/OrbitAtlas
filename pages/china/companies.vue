<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'China Space Program', to: '/china-space-program' }, { label: 'Companies' }]" />
    <h1>Chinese Space Companies</h1>
    <p class="lead">
      State-owned enterprises and private launch companies driving China's
      orbital launch program — from CASC to LandSpace and Galactic Energy.
    </p>
    <div class="grid grid-3">
      <EntityCard
        v-for="c in companies"
        :key="c.slug"
        :to="`/companies/${c.slug}`"
        :title="c.name"
        :subtitle="typeLabel(c.type)"
        :description="c.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CompanyType } from '~/types';
import { applySeo } from '~/utils/seo';

applySeo({
  title: 'Chinese Space Companies | OrbitAtlas',
  description:
    'Chinese space companies and organisations — CASC, LandSpace, Galactic Energy and more — with type, founding year, and rockets.',
  path: '/china/companies',
});

const { data: all } = useCompanies();
const companies = computed(() => (all.value ?? []).filter((c) => c.isChinaProgram));

function typeLabel(t: CompanyType): string {
  return { state: 'State', private: 'Private', 'state-owned-enterprise': 'State-owned enterprise', agency: 'Agency', consortium: 'Consortium' }[t];
}
</script>
