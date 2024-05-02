import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjjm2x9DRBuDdmjsdJUW5wRjPrU_q1tY4",
  authDomain: "chamados-b985b.firebaseapp.com",
  projectId: "chamados-b985b",
  storageBucket: "chamados-b985b.appspot.com",
  messagingSenderId: "721371863426",
  appId: "1:721371863426:web:7e73ed6a56f75d0010d79b",
  measurementId: "G-6DGNGDX7QN"
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {auth, db, storage};
