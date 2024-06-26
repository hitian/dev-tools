// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@vuestic/nuxt",
  ],
  devtools: { enabled: true },

  vuestic: {
    config: {
      // Config here
    },

    css: ["typography", "reset"],
  },
})
