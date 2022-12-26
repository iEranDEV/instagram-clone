import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            user: {} as User,
            loaded: false,
        }
    },

    mutations: {
        setLoaded(state, value) {
            state.loaded = value;
        },
        setUser(state, user) {
            state.user = user as User;
        }
    },
})

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
})
