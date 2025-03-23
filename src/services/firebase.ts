import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC5xeeWjT3XpPMPamhSc748D9Bbif0RhzM",
  authDomain: "aurora-baby-mobile.firebaseapp.com",
  projectId: "aurora-baby-mobile",
  storageBucket: "aurora-baby-mobile.firebasestorage.app",
  messagingSenderId: "450824864919",
  appId: "1:450824864919:web:39dc697565b309cb4ed5d2",
  measurementId: "G-DF2KM62PL6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);