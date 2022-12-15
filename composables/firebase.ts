import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from 'firebase/firestore';

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

export const db = getFirestore(app);


// Create new user with email and password
export const createUser: any = async (email: string, password: string, displayName: string, fullName: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
        const user_data = userCredentials.user;
        const user = {
            uid: user_data.uid,
            displayName: displayName,
            fullName: fullName,
            email: user_data.email,
            emailVerified: user_data.emailVerified,
            phoneNumber: user_data.phoneNumber,
            createdAt: user_data.metadata.creationTime,
            photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png',
            bio: ''
        }

        try {
            await setDoc(doc(db, "users", user.uid), user);
            useState('user', () => user);
            navigateTo('/test');
            return user;
        } catch(error) {
            console.log(error);
            return error;
        }

    }).catch((error) => {
        return error;
    });
}

// Login existing user with email and password
export const loginUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
        const user_data = userCredentials.user;
        const userSnap = await getDoc(doc(db, "users", user_data.uid));
        if(userSnap.exists()) {
            const user = userSnap.data();
            console.log(user);
            useState('user', () => user);
            navigateTo('/test');
            return user;
        }
    }).catch((error) => {
        return error;
    })
}
