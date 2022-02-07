import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
    target: 'static',
    bridge: {
        nitro: false
    },
    ssr: false,
    /*
     ** Headers of the page
     */
    head: {
        title: 'dev tools',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'dev tools.' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },
    modules: ['bootstrap-vue/nuxt'],
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#3B8070' },
    /*
     ** Build configuration
     */
    build: {
        vendor: [
            'js-base64',
            'vue-json-pretty',
            'locutus/php/var/unserialize',
            'locutus/php/var/serialize',
            'moment-timezone',
        ]
    }
})