<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand" no-prefetch>
        <span class="brand-mark">◎</span>
        <span class="brand-name">OrbitAtlas</span>
      </NuxtLink>
      <nav class="nav" :class="{ open }">
        <NuxtLink to="/rockets">Rockets</NuxtLink>
        <NuxtLink to="/launches">Launches</NuxtLink>
        <NuxtLink to="/missions">Missions</NuxtLink>
        <NuxtLink to="/companies">Companies</NuxtLink>
        <NuxtLink to="/engines">Engines</NuxtLink>
        <NuxtLink to="/launch-sites">Launch Sites</NuxtLink>
        <NuxtLink to="/china-space-program">China Space</NuxtLink>
        <NuxtLink to="/compare">Compare</NuxtLink>
      </nav>
      <button class="nav-toggle" :aria-expanded="open" @click="open = !open" aria-label="Toggle navigation">
        ☰
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const open = ref(false);
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(11, 18, 32, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text);
}
.brand:hover {
  text-decoration: none;
}
.brand-mark {
  color: var(--accent);
  font-size: 1.3rem;
}
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
}
.nav a {
  color: var(--text-soft);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
}
.nav a:hover {
  color: var(--text);
  text-decoration: none;
}
.nav a.router-link-active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
.nav-toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 4px 10px;
  border-radius: 8px;
  cursor: pointer;
}
@media (max-width: 860px) {
  .nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-soft);
    border-bottom: 1px solid var(--border);
    padding: 12px 20px;
    flex-direction: column;
    gap: 6px;
  }
  .nav.open {
    display: flex;
  }
  .nav-toggle {
    display: inline-block;
  }
}
</style>
