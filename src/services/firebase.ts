import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//console.log('Constants.expoConfig:', Constants.expoConfig)

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || 'AIzaSyC5xeeWjT3XpPMPamhSc748D9Bbif0RhzM',
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || 'aurora-baby-mobile.firebaseapp.com',
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || 'aurora-baby-mobile',
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || 'aurora-baby-mobile.firebasestorage.app',
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || '450824864919',
  appId: Constants.expoConfig?.extra?.firebaseAppId || '1:450824864919:web:39dc697565b309cb4ed5d2',
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId || 'G-DF2KM62PL6'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { onAuthStateChanged, signInWithEmailAndPassword }; // Export for use elsewhere