module.exports = {
    target: 'static',
    ssr: false,
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
}