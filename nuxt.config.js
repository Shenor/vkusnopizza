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
  target: 'static',
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
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'},
      {src: 'https://cdn.jsdelivr.net/gh/Shenor/cartography_api@master/jquery.fias.min.js'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700;900&display=swap'},
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/Shenor/cartography_api@master/jquery.fias.min.css'}
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/global.scss',
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
  env: {},
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '@/plugins/vue-event-hub'},
    { src: '@/plugins/vue-masked-input'},
    { src: '@/plugins/vue-draggable'},
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
    '@nuxtjs/dotenv',
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
    '@nuxtjs/axios',
    '@nuxtjs/strapi',
    '@nuxt/http'
  ],
  strapi: {
    entities: ['clients']
  },
  bootstrapVue: {
    icons: true
  },
  styleResources: {
    scss: [
      '@/assets/styles/index.scss'
    ]
  },
  http: {
    host: 'localhost',
    port: 3010
  },
  /*
  ** PWA options
  */
  pwa: {
    workbox: false
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
  serverMiddleware: [
    { path: "/api", handler: "~/server/index.js" },
  ],
}
