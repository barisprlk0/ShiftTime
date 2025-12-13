import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDW8JBCj0nFvp6v-4haJGWa8s1qQaenNHA",
  authDomain: "stacademy.firebaseapp.com",
  projectId: "stacademy",
  storageBucket: "stacademy.firebasestorage.app",
  messagingSenderId: "108601632538",
  appId: "1:108601632538:web:1c3e8838adeb22799b2ea3",
  measurementId: "G-2EQG237776"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
