import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
    setPersistence(auth, browserLocalPersistence);
    auth.onAuthStateChanged(async (user) => {
        if(user) {
            const userSnap = await getDoc(doc(firestore, "users", user.uid));
            if(userSnap.exists()) {
                useState('user', () => userSnap.data() as User);
            }
        } else {
            useState('user', () => {});
            navigateTo('/accounts/login')
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