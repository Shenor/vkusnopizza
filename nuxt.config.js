
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js'},
      {src: 'https://cdn.jsdelivr.net/gh/Shenor/cartography_api@master/jquery.fias.min.js'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/Shenor/cartography_api@master/jquery.fias.min.css'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700;900&display=swap'}
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@assets/scss/global.scss',
  ],
  /*
   ** Router Nuxt
   */
  router: {
    linkActiveClass: 'active'
  },
  /*
  ** Environment Nuxt
  */
  env: {
    ORGANIZATION_ID: 'fe470000-906b-0025-bf94-08d85ef15bee'
  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '@/plugins/vue-event-hub'},
    { src: '@/plugins/vue-masked-input'},
    { src: '@/plugins/vue-vuelidate', ssr: true },
    { src: '@/plugins/localStoreage', ssr: false},
    { src: '@/plugins/vue-flicking', mode: 'client', ssr: true }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '@nuxt/http'
  ],
  styleResources: {
    scss: [
      '@assets/scss/colors.scss'
    ]
  },
  http: {
    host: 'localhost',
    port: 3010
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    loaders: {
      vue: {
        compilerOptions: {
          // This option is highly recommended
          preserveWhitespace: false
        }
      }
    },
    vendor: [
      'vue-flicking',
      'vue-vuelidate'
    ]
  },
  /*
  ** Server configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
}
