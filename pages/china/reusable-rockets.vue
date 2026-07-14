<template>
  <div>
    <Breadcrumbs :crumbs="[{ label: 'China Space Program', to: '/china-space-program' }, { label: 'Reusable Rockets' }]" />
    <h1>Chinese Reusable Rockets</h1>
    <p class="lead">
      China is developing reusable orbital rockets to lower launch costs,
      including the reusable Long March 8 variant and LandSpace's Zhuque-3.
      None have yet achieved routine operational reuse.
    </p>
    <div class="grid grid-3">
      <EntityCard
        v-for="r in reusable"
        :key="r.slug"
        :to="`/rockets/${r.slug}`"
        :title="r.name"
        :subtitle="statusLabel(r.status)"
        :description="r.description"
        :tag="{ label: r.reusable ? 'Reusable' : 'Reuse in testing', variant: 'warn' }"
      />
    </div>
    <div class="note" style="margin-top: 24px">
      Status as of the last update: no Chinese commercial company has yet
      reflown an orbital first stage. Several vehicles are in active test. Data
      will be updated as flights occur.
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RocketStatus } from '~/types';
import { applySeo } from '~/utils/seo';

applySeo({
  title: 'Chinese Reusable Rockets | OrbitAtlas',
  description:
    'Chinese reusable rocket programs in data — Zhuque-3, the reusable Long March 8 variant, and other Chinese vehicles targeting first-stage reuse.',
  path: '/china/reusable-rockets',
});

const { data: all } = useRockets();
// Chinese rockets that are reusable or have a reuse program (isChinaProgram + reusable).
const reusable = computed(() =>
  (all.value ?? []).filter((r) => r.isChinaProgram && r.reusable),
);

function statusLabel(s: RocketStatus): string {
  return { active: 'Active', 'in-development': 'In development', retired: 'Retired', cancelled: 'Cancelled' }[s];
}
</script>
