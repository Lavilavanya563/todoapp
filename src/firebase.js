import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDHQFZENl14vI9caaiXF3xa45U1oF-oiCI",
  authDomain: "oauth-9a193.firebaseapp.com",
  projectId: "oauth-9a193",
  storageBucket: "oauth-9a193.firebasestorage.app",
  messagingSenderId: "107316606105",
  appId: "1:107316606105:web:37b0fac6f54013b8867408",
  measurementId: "G-RFY4473SHC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account" 
});
const db = getFirestore(app); 

export { auth, provider, signInWithPopup, signOut, db };
