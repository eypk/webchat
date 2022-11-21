import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvfhyyOZPfXGX2I9crtc_xFa-1y8ZpZSQ",
  authDomain: "webchat-d26aa.firebaseapp.com",
  projectId: "webchat-d26aa",
  storageBucket: "webchat-d26aa.appspot.com",
  messagingSenderId: "781615986999",
  appId: "1:781615986999:web:1a6ec450f6799a8e7202b2",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
