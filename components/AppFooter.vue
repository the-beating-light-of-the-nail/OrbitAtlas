<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="brand-mark">◎</span>
        <div>
          <div class="name">OrbitAtlas</div>
          <div class="dim">Space Launch &amp; Rocket Database</div>
        </div>
      </div>
      <nav class="footer-nav">
        <NuxtLink to="/rockets">Rockets</NuxtLink>
        <NuxtLink to="/launches">Launches</NuxtLink>
        <NuxtLink to="/companies">Companies</NuxtLink>
        <NuxtLink to="/engines">Engines</NuxtLink>
        <NuxtLink to="/launch-sites">Launch Sites</NuxtLink>
        <NuxtLink to="/china-space-program">China Space Program</NuxtLink>
        <NuxtLink to="/compare">Compare</NuxtLink>
      </nav>
      <div class="footer-note dim">
        <p>
          OrbitAtlas is an independent, community-edited space database. Data is
          provided for informational purposes and may be incomplete or out of
          date. Unknown values are marked as such rather than invented.
        </p>
        <p class="copy">© {{ year }} OrbitAtlas. MIT License.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  background: var(--bg-soft);
  padding: 32px 0;
  margin-top: 40px;
}
.footer-inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  align-items: start;
}
.footer-brand {
  display: flex;
  gap: 10px;
  align-items: center;
}
.footer-brand .brand-mark {
  color: var(--accent);
  font-size: 1.6rem;
}
.footer-brand .name {
  font-weight: 700;
}
.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
}
.footer-nav a {
  color: var(--text-soft);
  font-size: 0.9rem;
}
.footer-note {
  grid-column: 1 / -1;
  font-size: 0.85rem;
}
.footer-note p {
  margin: 0 0 6px;
}
.footer-note .copy {
  color: var(--text-dim);
}
@media (max-width: 640px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }
}
</style>
