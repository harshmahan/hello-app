
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtZ3Sp905ZSVS6xNvOQkUoP19XH8ItB2I",
    authDomain: "hello-app-ad6ef.firebaseapp.com",
    projectId: "hello-app-ad6ef",
    storageBucket: "hello-app-ad6ef.appspot.com",
    messagingSenderId: "1033064337675",
    appId: "1:1033064337675:web:2caaa5a6c323e16ca5920e",
    measurementId: "G-JN8ZT1GYRJ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new GoogleAuthProvider();

  export { auth, provider };
  export default db;