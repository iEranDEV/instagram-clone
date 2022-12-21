import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
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
    const storage = getStorage(app);
    const firestore = getFirestore(app);

    return {
        app,
        auth,
        storage,
        firestore
    }
}

/*
// Update user
export const updateUser = async (user: any) => {
    const snap_old = await getDoc(doc(db, "users", user.uid));
    if(snap_old.exists()) {
        const user_old = snap_old.data();
        if(user_old.email != user.email && auth.currentUser) {
            await updateEmail(auth.currentUser, user.email).catch((error) => {
                return error;
            })
        }
        setDoc(doc(db, "users", user.uid), user).then(() => {
            return user;
        }).catch((error) => {
            return error;
        })
    }
}

// Upload photo to storage
export const uploadPhoto = async (file: File) => {
    return uploadBytes(ref(storage, file.name), file).then(async (snapshot) => {
        return getDownloadURL(snapshot.ref).then((downloadURL) => {
            return downloadURL;
        })
    }).catch((error) => {
        console.log(error);
        return error;
    })
}
*/