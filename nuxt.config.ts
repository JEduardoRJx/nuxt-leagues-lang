// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/styles.css'],
  modules: ['@nuxtjs/prismic'],
  prismic: {
    endpoint: 'https://vanilla-leagues.cdn.prismic.io/api/v2',
    routes: [
      {
        type: 'league',
        path: '/:lang/:uid',
      },
    ],
  },
  runtimeConfig: {
    public: {
      prismic: {
        locales: ['en-us', 'es-mx'],
        defaultLocale: 'en-us',
      },
    },
  },
});
