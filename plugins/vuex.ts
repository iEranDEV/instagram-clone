import { createStore } from "vuex";

export const store = createStore({
    state() {
        return {
            user: {} as User,
            loaded: false,
            notifications: Array<{error: boolean, message: string}>()
        }
    },

    mutations: {
        setLoaded(state, value) {
            state.loaded = value;
        },
        setUser(state, user) {
            state.user = user as User;
        },
        addNotification(state, notification) {
            state.notifications.push(notification);
            const removeNotification = async () => {
                setTimeout(() => {
                    state.notifications.splice(state.notifications.indexOf(notification), 1);
                }, 3000);
            }
            removeNotification();
        }
    },
})

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
})
