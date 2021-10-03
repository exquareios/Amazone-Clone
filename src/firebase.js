import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCL1satoxrpXRiF0J-_Dhmz7PZN9uAzrDI",
  authDomain: "clone-32a3a.firebaseapp.com",
  projectId: "clone-32a3a",
  storageBucket: "clone-32a3a.appspot.com",
  messagingSenderId: "492259405881",
  appId: "1:492259405881:web:df473ca00a48b552665de8",
  measurementId: "G-JLYLQ8L4TS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
