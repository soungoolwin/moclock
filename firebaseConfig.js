import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRTRvajymluoP4tPdimUQRq1_MoLCaVc0",
  authDomain: "moclock-fc96e.firebaseapp.com",
  projectId: "moclock-fc96e",
  storageBucket: "moclock-fc96e.firebasestorage.app",
  messagingSenderId: "315539171946",
  appId: "1:315539171946:web:d62d9ec0c49676109b7813",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
