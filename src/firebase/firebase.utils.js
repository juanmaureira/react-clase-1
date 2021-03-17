import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDCZSee4xENMUnynaUvQ3oUjh2A0v3jY6U",
    authDomain: "fir-app-react-20d90.firebaseapp.com",
    projectId: "fir-app-react-20d90",
    storageBucket: "fir-app-react-20d90.appspot.com",
    messagingSenderId: "586652557316",
    appId: "1:586652557316:web:48351c8a8004f0d453d551",
    measurementId: "G-YGPWZ3B4QP"
};

firebase.initializeApp(config);


export const createUserProfileDocument = async (userAuth, additionalData) => {
    
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            });
        } catch (e) {
            console.log('error creando usuario: ', e.message );
        }
    }

    return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

