// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // Variables only visible on server-side
	runtimeConfig: {

    },

    app: {
        head: {
            title: 'Instagram',
        },
    },

    // Initialize postcss plugins
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },

    // Initalize tailwind 
    css: ['~/assets/css/main.css'],

})
