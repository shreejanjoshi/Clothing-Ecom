import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACfF9ZiKyi-VCakIknuad3vqG2TiI0adI",
  authDomain: "crwn-clothing-db-92fcc.firebaseapp.com",
  projectId: "crwn-clothing-db-92fcc",
  storageBucket: "crwn-clothing-db-92fcc.appspot.com",
  messagingSenderId: "329291585016",
  appId: "1:329291585016:web:1ff38c9442ed70baa8b20d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// to use google auth .. it is class .. different provider
const provider = new GoogleAuthProvider();
// take confi obj and we can tell the different way this google auth to behave
provider.setCustomParameters({
  prompt: "select_account",
});

// must be same always
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// db
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    // take that data and stote u-in firestore
    // nedd to see extisting doc refferences
    // 3 argument db, collections, identofierer (uqnik id)
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    // must be done in async
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    // if user data snapshot dont exits
    // create / set doc with the data from userAuth in my collection
    // bangoperator
    if(!userSnapshot.exists()){
        // field on this obj like uid
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            // pass userDocRef and data
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch(error){
            console.log('error creating the user', error.message);
        }
    }

    // if user data exits

    return userDocRef;

    // return uersDocRef
}
