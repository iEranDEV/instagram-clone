import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Define firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbiiV20Sb6bEneZHW6Vu6pueiqqqzMUs4",
    authDomain: "instagram-clone-narei.firebaseapp.com",
    projectId: "instagram-clone-narei",
    storageBucket: "instagram-clone-narei.appspot.com",
    messagingSenderId: "1025597604584",
    appId: "1:1025597604584:web:6dddbf361ae27dc3b17f5d",
    measurementId: "G-HDD3XMVFW8"
};

// Initialize firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const createUser = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        const user = userCredentials.user;
        return user;
    }).catch((error) => {
        return error;
    });
}

export const loginUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        const user = userCredentials.user;
        return user;
    }).catch((error) => {
        return error;
    })
}