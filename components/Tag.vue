<template>
  <span class="tag" :class="variant">{{ label }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  variant?: 'default' | 'ok' | 'warn' | 'danger' | 'dim';
}>();

const variant = computed(() => props.variant ?? 'default');
</script>
