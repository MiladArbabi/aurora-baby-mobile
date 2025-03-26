import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
export const googleProvider = GoogleAuthProvider;

export const signInWithGoogle = async (idToken: string) => {
  try {
    const credential = googleProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);
    const token = await result.user.getIdToken();
    await AsyncStorage.setItem('userToken', token);
    return result.user;
  } catch (error) {
    console.error('Google Auth Error:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    await AsyncStorage.setItem('userToken', token);
    return result.user;
  } catch (error) {
    console.error('Email Sign-In Error:', error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    await AsyncStorage.setItem('userToken', token);
    return result.user;
  } catch (error) {
    console.error('Email Sign-Up Error:', error);
    throw error;
  }
};

export { onAuthStateChanged, signInWithEmailAndPassword };