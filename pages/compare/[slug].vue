<template>
  <div v-if="compare">
    <Breadcrumbs :crumbs="[{ label: 'Compare', to: '/compare' }, { label: compare.name }]" />
    <h1>{{ compare.name }}</h1>
    <p class="lead">{{ compare.summary }}</p>

    <section class="section tight">
      <h2>Comparison Table</h2>
      <table class="compare">
        <thead>
          <tr>
            <th class="attr">Attribute</th>
            <th v-for="(e, i) in compare.entities" :key="i">
              <NuxtLink v-if="entityTo(e)" :to="entityTo(e)!">{{ entityLabel(e) }}</NuxtLink>
              <span v-else>{{ entityLabel(e) }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in compare.comparisonTable" :key="row.attribute">
            <td class="attr">{{ row.attribute }}</td>
            <td v-for="(v, i) in row.values" :key="i">{{ v === null ? 'Unknown' : v }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <div class="grid grid-2">
      <section class="section tight">
        <h2>Key Similarities</h2>
        <ul>
          <li v-for="(s, i) in compare.keySimilarities" :key="i">{{ s }}</li>
        </ul>
      </section>
      <section class="section tight">
        <h2>Key Differences</h2>
        <ul>
          <li v-for="(d, i) in compare.keyDifferences" :key="i">{{ d }}</li>
        </ul>
      </section>
    </div>

    <div class="grid grid-2">
      <section class="section tight">
        <h2>Use Cases</h2>
        <ul>
          <li v-for="(u, i) in compare.useCases" :key="i">{{ u }}</li>
        </ul>
      </section>
      <section class="section tight">
        <h2>Limitations &amp; Unknowns</h2>
        <ul>
          <li v-for="(lim, i) in compare.limitations" :key="i">{{ lim }}</li>
        </ul>
      </section>
    </div>

    <section v-if="compare.faqs.length" class="section tight">
      <h2>FAQ</h2>
      <div class="faq">
        <details v-for="(f, i) in compare.faqs" :key="i">
          <summary>{{ f.question }}</summary>
          <p class="muted" style="margin-top: 8px">{{ f.answer }}</p>
        </details>
      </div>
    </section>

    <section v-if="compare.sourceUrls.length" class="section tight">
      <h2>Sources</h2>
      <ul class="linklist">
        <li v-for="url in compare.sourceUrls" :key="url">
          <a :href="url" target="_blank" rel="noopener noreferrer">{{ url }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Compare, CompareEntityRef } from '~/types';
import { kindToPath } from '~/utils/relations';
import { applySeo, entityTitle, entityJsonLd } from '~/utils/seo';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: compare } = await useCompare(slug);
if (!compare.value) {
  throw createError({ statusCode: 404, statusMessage: 'Comparison not found', fatal: true });
}

const c = compare.value as Compare;
const path = `/compare/${c.slug}`;

applySeo({
  title: entityTitle(c.name, 'compare'),
  description: c.summary.slice(0, 155),
  path,
});
entityJsonLd({ name: c.name, description: c.summary, path, lastUpdated: c.lastUpdated });

function entityTo(e: CompareEntityRef): string | undefined {
  // CompareEntityRef.kind already excludes 'compare', so all kinds are linkable.
  return kindToPath(e.kind).detail(e.slug);
}
function entityLabel(e: CompareEntityRef): string {
  return e.label ?? e.slug;
}
</script>
