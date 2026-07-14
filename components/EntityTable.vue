<template>
  <table class="facts">
    <tbody>
      <tr v-for="row in rows" :key="row.label">
        <td class="label">{{ row.label }}</td>
        <td>
          <slot :name="`cell-${row.key}`" :value="row.value">{{ row.display }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
export interface FactRow {
  key: string;
  label: string;
  value: unknown;
  /** Pre-formatted display string. */
  display: string;
}

defineProps<{ rows: FactRow[] }>();
</script>
