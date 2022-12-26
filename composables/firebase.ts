import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useStore } from 'vuex';

export const useFirebase = () => {
    const runtimeConfig = useRuntimeConfig();
    const firebaseConfig = {
        apiKey: runtimeConfig.public.firebase.apiKey,
        authDomain: runtimeConfig.public.firebase.authDomain,
        projectId: runtimeConfig.public.firebase.projectId,
        storageBucket: runtimeConfig.public.firebase.storageBucket,
        messagingSenderId: runtimeConfig.public.firebase.messagingSenderId,
        appId: runtimeConfig.public.firebase.appId,
        measurementId: runtimeConfig.public.firebase.measurementId
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const store = useStore();
    setPersistence(auth, browserLocalPersistence);
    auth.onAuthStateChanged(async (user) => {
        if(user) {
            if(user.uid !== store.state.user.uid) {
                store.commit('setLoaded', false);
                const userSnap = await getDoc(doc(firestore, "users", user.uid));
                if(userSnap.exists()) {
                    store.commit('setUser', userSnap.data() as User);
                    store.commit('setLoaded', true);
                }
            }
        } else {
            store.commit('setLoaded', false);
            store.commit('setUser', {});
            if(process.client) navigateTo('/accounts/login');
        }
    })
    const storage = getStorage(app);
    const firestore = getFirestore(app);

    return {
        app,
        auth,
        storage,
        firestore
    }
}