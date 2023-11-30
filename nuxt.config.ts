// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      webUrl: process.env.WEB_URL,
    },
  },
  app: {
    /*
     ** Headers of the page
     ** Setting correct values should help SEO results
     */
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "snellerboekendandebuurman",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Sneller boeken dan de buurman.",
        },
        { name: "theme-color", content: "#ffffff" },
        { name: "msapplication-TileColor", content: "#da532c" },

        // open graph
        // https://masteringnuxt.com/blog/setting-up-nuxt-for-social-cards-and-meta-tags-to-improve-seo
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:title",
          property: "og:title",
          content: "snellerboekendandebuurman",
        },
        { hid: "og:url", property: "og:url", content: process.env.BASE_URL },
        {
          hid: "og:description",
          property: "og:description",
          content: "Sneller boeken dan de buurman.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: process.env.BASE_URL + "/booker-logo.png",
        },

        // twitter card
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "snellerboekendandebuurman",
        },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: process.env.BASE_URL,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "Sneller boeken dan de buurman.",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: process.env.BASE_URL + "/booker-logo.png",
        },
      ],
      // Setting favicons and other logos
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
      ],
    },
  },
  modules: [
    // https://vueuse.org/
    "@vueuse/nuxt",
    // https://github.com/nuxt-modules/i18n
    "@nuxtjs/i18n",
    // https://github.com/ymmooot/nuxt-jsonld
    "nuxt-jsonld",
    // https://github.com/funkenstudio/sitemap-module-nuxt-3
    "@funken-studio/sitemap-nuxt-3",
    // https://github.com/nuxt-community/robots-module
    "@nuxtjs/robots",
    // https://vee-validate.logaretm.com/v4/
    "@vee-validate/nuxt",
  ],
  // config for i18n
  i18n: {
    defaultLocale: "en",
    strategy: "prefix",
    baseUrl: process.env.WEB_URL,
    locales: [
      {
        code: "nl",
        iso: "nl-NL",
        file: "nl.json",
        name: "Dutch",
      },
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
        name: "English",
      },
    ],
    lazy: true,
    langDir: "locales/",
    // Enable browser language detection to automatically redirect user
    // to their preferred language as they visit your app for the first time
    detectBrowserLanguage: {
      // If enabled, a cookie is set once a user has been redirected to his
      // preferred language to prevent subsequent redirections
      // Set to false to redirect every time
      useCookie: true,
      // Cookie name
      cookieKey: "i18n",
      // the language detection is only attempted when the user visits the root path (/) of the site.
      redirectOn: "root",
      // Set to always redirect to value stored in the cookie, not just once
      alwaysRedirect: true,
      // If no locale for the browsers locale is a match, use this one as a fallback
      fallbackLocale: "en",
    },
    // add `vueI18n` option to `@nuxtjs/i18n` module options
    vueI18n: "./i18n.options.ts",
  },
  // config for sitemap-module
  sitemap: {
    hostname: "https://snellerboekendandebuurman.nl",
  },
  // config for robots-module
  robots: {
    UserAgent: "*",
    Disallow: "",
  },
  buildModules: ["mobx-vue-lite/nuxt"],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      "postcss-import": {},
      "tailwindcss/nesting": {},
    },
  },
});
