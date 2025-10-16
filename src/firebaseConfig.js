import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMO1IynY7I0bBAmBVp7BYH2AddpWLSonU",
  authDomain: "shifttime-ab2f6.firebaseapp.com",
  projectId: "shifttime-ab2f6",
  storageBucket: "shifttime-ab2f6.appspot.com",
  messagingSenderId: "823834697705",
  appId: "1:823834697705:web:aba293f9dfb7a8c28cf578",
  measurementId: "G-9LV90DKX7B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
