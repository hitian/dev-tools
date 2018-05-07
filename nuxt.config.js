module.exports = {
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: 'tools-less-run',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'dev tools.' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: '/css/bootstrap.min.css' }
        ],
        script: [
            { src: '/js/jquery-3.2.1.slim.min.js' },
            { src: '/js/popper.min.js' },
            { src: '/js/bootstrap.min.js' }
        ]
    },
    modules: [
        // Simple usage
        ['@nuxtjs/google-analytics', {
            id: 'UA-118766518-1'
        }]
    ],
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#3B8070' },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** Run ESLint on save
         */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}