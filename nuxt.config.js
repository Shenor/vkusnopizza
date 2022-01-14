// require('dotenv').config();

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Сеть пиццерий Pizzburg - пицца, бургеры, роллы ...",
    htmlAttrs: {
      lang: "ru",
    },
    meta: [
      { charset: "utf-8" },
      {
        "http-equiv": "Content-Security-Policy",
        content: "upgrade-insecure-requests",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Мы готовим действительно вкусную пиццу. А еще у нас есть бургеры и роллы. Кафе находятся в Краснодаре. Работаем до часа ночи. PizzBurg - готовим вкусное настроение!",
      },
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/Shenor/cartography_api@master/jquery.fias.min.js",
      },
    ],
    link: [
      { rel: "preconnect", href: "https://iiko.biz:9900" },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/cropped-favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/cropped-favicon-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "apple-touch-icon",
        type: "image/x-icon",
        href: "/cropped-favicon-180x180.png",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700;900&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/gh/Shenor/cartography_api@master/jquery.fias.min.css",
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ["@/assets/styles/global.scss"],
  /*
   ** Router Nuxt
   */
  router: {
    linkActiveClass: "active",
  },
  /*
   ** Environment Nuxt
   */
  publicRuntimeConfig: {
    ADMIN_PASS: process.env.ADMIN_PAGE_PASS,
    CALL_CENTER: "8 (938) 888-22-55",
    CALL_CENTER_TRIM: "89388882255",
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "@/plugins/vue-event-hub" },
    { src: "@/plugins/vue-masked-input" },
    { src: "@/plugins/vue-draggable" },
    { src: "@/plugins/vue-vuelidate", ssr: true },
    { src: "@/plugins/vue-click-outside", ssr: true },
    { src: "@/plugins/vue-persistance", ssr: false },
    { src: "@/plugins/vue-flicking", mode: "client", ssr: true },
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
    ["@nuxtjs/dotenv", { filename: ".env." + process.env.NODE_ENV }],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    "@nuxtjs/markdownit",
    "@nuxtjs/style-resources",
    "@nuxtjs/proxy",
    "@nuxtjs/axios",
    "@nuxtjs/strapi",
    "@nuxtjs/dotenv",
    "@nuxt/http",
  ],
  strapi: {
    url: process.env.STRAPI_URL,
    entities: ["clients", "banners", "orders", "stocks"],
  },
  bootstrapVue: {
    icons: true,
  },
  markdownit: {
    runtime: true, // Support `$md()`
  },
  styleResources: {
    scss: ["@/assets/styles/index.scss"],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    devMiddleware: {
      headers: {
        "Cache-Control": "no-store",
        Vary: "*",
      },
    },
    loaders: {
      vue: {
        compilerOptions: {
          // This option is highly recommended
          preserveWhitespace: false,
        },
      },
    },
    vendor: ["vue-flicking", "vue-vuelidate"],
  },
  /*
   ** Server configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  server: {
    port: 3000, // default: 3000
    // host: '0.0.0.0', // default: localhost,
    timing: false,
  },
  serverMiddleware: [{ path: "/api", handler: "~/server/index.js" }],
  devServer: {
    inline: false,
  },
};
