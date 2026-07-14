// https://nuxt.com/docs/api/configuration/nuxt-config
const nitroConfig = {
  prerender: {
    crawlLinks: true,
    routes: ['/', '/sitemap.xml', '/robots.txt'],
  },
};

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  typescript: {
    strict: true,
    typeCheck: false,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'OrbitAtlas — Space Launch & Rocket Database',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'OrbitAtlas is a space launch and rocket database tracking rockets, launches, missions, companies, engines, and launch sites around the world.',
        },
        { name: 'theme-color', content: '#0b1220' },
        { property: 'og:site_name', content: 'OrbitAtlas' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  css: ['~/assets/css/main.css'],

  // `nitro` is a valid runtime Nuxt 3 config key but is not always present in
  // the generated NuxtConfig type, so we spread it in via a typed cast.
  ...({ nitro: nitroConfig } as Record<string, unknown>),
});
