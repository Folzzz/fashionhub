import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDr-252pd0_L71DJnqNUyA1cGLAtAJ7RdM",
    authDomain: "crown-shoppingdb.firebaseapp.com",
    databaseURL: "https://crown-shoppingdb.firebaseio.com",
    projectId: "crown-shoppingdb",
    storageBucket: "crown-shoppingdb.appspot.com",
    messagingSenderId: "551624199546",
    appId: "1:551624199546:web:9b0d69937bff2c65dd1ac3",
    measurementId: "G-S4F1TCF564"
  };

  //allows us to store the userauth gotten and stored in our database
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    //if the userauth object doesnt exist then return
    if(!userAuth) return;

    //if userauth exist, we query into the firestore for the userauth 
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //this is how we get the document snapshot object using .get
    const snapShot = await userRef.get();

    //now we are setting the data into our database
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const SignInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;