<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <NuxtLink to="/">Home</NuxtLink>
    <template v-for="(crumb, i) in crumbs" :key="i">
      <span class="sep">/</span>
      <NuxtLink v-if="i < crumbs.length - 1 && crumb.to" :to="crumb.to">{{ crumb.label }}</NuxtLink>
      <span v-else>{{ crumb.label }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
interface Crumb {
  label: string;
  to?: string;
}
defineProps<{ crumbs: Crumb[] }>();
</script>
