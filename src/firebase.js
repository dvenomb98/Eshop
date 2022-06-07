
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3b0qwm9n8zXhG86oFAHxWlCoFbvcGinU",
  authDomain: "eshop-a0003.firebaseapp.com",
  projectId: "eshop-a0003",
  storageBucket: "eshop-a0003.appspot.com",
  messagingSenderId: "986171421507",
  appId: "1:986171421507:web:e32eb25a10b4344161f5f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export default app
