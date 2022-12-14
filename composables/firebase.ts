import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider
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


// Create new user with email and password
export const createUser = async (email: string, password: string, username: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        const user = userCredentials.user;

        // Setting custom data for recently created user
        updateProfile(user, {
            displayName: username,
            photoURL: 'https://i.pinimg.com/736x/d1/51/62/d15162b27cd9712860b90abe58cb60e7.jpg'
        }).then(() => {
            let credentials = EmailAuthProvider.credential(email, password);
            reauthenticateWithCredential(user, credentials).then((updatedUser) => {
                useState('user', () => updatedUser.user);
                navigateTo('/test');
            }).catch((error) => {
                return error
            });
        }).catch((error) => {
            return error;
        }) 

        return user;
    }).catch((error) => {
        return error;
    });
}

// Login existing user with email and password
export const loginUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        const user = userCredentials.user;
        useState('user', () => user);
        navigateTo('/test');
        return user;
    }).catch((error) => {
        return error;
    })
}
