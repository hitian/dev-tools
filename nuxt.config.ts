// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      appVersion: process.env.NODE_ENV !== 'production' 
        ? 'debug' 
        : (process.env.GITHUB_SHA || process.env.CF_PAGES_COMMIT_SHA || 'unknown').slice(0, 7)
    }
  },

  compatibilityDate: "2024-12-16",
})
