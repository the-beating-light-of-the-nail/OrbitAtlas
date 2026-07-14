<template>
  <div v-if="links.length">
    <h3 v-if="heading" class="related-heading">{{ heading }}</h3>
    <ul class="linklist">
      <li v-for="link in links" :key="`${link.kind}-${link.slug}`">
        <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
        <span v-if="link.note" class="dim" style="margin-left: 6px">— {{ link.note }}</span>
      </li>
    </ul>
  </div>
  <p v-else class="empty">No related entries recorded yet.</p>
</template>

<script setup lang="ts">
import type { EntityKind } from '~/types';

export interface RelatedLink {
  kind: EntityKind;
  slug: string;
  label: string;
  note?: string;
  to: string;
}

defineProps<{ links: RelatedLink[]; heading?: string }>();
</script>
