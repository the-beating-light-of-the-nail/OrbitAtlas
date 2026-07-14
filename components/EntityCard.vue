<template>
  <NuxtLink v-if="to" :to="to" class="card entity-card">
    <div class="row">
      <h3>{{ title }}</h3>
      <Tag v-if="tag" :label="tag.label" :variant="tag.variant" />
    </div>
    <p v-if="subtitle" class="meta">{{ subtitle }}</p>
    <p v-if="description" class="desc">{{ description }}</p>
    <slot name="footer" />
  </NuxtLink>
  <div v-else class="card entity-card">
    <div class="row">
      <h3>{{ title }}</h3>
      <Tag v-if="tag" :label="tag.label" :variant="tag.variant" />
    </div>
    <p v-if="subtitle" class="meta">{{ subtitle }}</p>
    <p v-if="description" class="desc">{{ description }}</p>
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  to?: string;
  title: string;
  subtitle?: string;
  description?: string;
  tag?: { label: string; variant?: 'default' | 'ok' | 'warn' | 'danger' | 'dim' };
}>();
</script>

<style scoped>
.entity-card .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.entity-card h3 {
  margin: 0;
}
.entity-card .desc {
  margin: 8px 0 0;
  color: var(--text-soft);
  font-size: 0.92rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
