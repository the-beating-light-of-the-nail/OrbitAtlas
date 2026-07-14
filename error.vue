<template>
  <NuxtLayout>
    <div>
      <Breadcrumbs :crumbs="[{ label: 'Page not found' }]" />
      <h1>{{ error.statusCode || 404 }} — Not Found</h1>
      <p class="lead">
        The page or entity you're looking for doesn't exist. It may have been
        renamed, or the data may not have been added yet.
      </p>
      <p>
        <NuxtLink class="btn primary" to="/">Back to home</NuxtLink>
        &nbsp;
        <NuxtLink class="btn" to="/rockets">Browse rockets</NuxtLink>
      </p>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

useSeoMeta({
  title: `${props.error.statusCode ?? 404} — OrbitAtlas`,
  description: 'The page you requested could not be found.',
});
</script>
