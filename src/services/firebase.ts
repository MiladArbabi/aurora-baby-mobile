import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  Auth, 
  AuthCredential, 
  User,
  UserCredential,
  signInWithCredential 
} from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Debug config loading
console.log('Expo Config:', Constants.expoConfig);

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || 'AIzaSyC5xeeWjT3XpPMPamhSc748D9Bbif0RhzM',
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || 'aurora-baby-mobile.firebaseapp.com',
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || 'aurora-baby-mobile',
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || 'aurora-baby-mobile.appspot.com',
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || '450824864919',
  appId: Constants.expoConfig?.extra?.firebaseAppId || '1:450824864919:web:39dc697565b309cb4ed5d2',
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId || 'G-DF2KM62PL6'
};

console.log('Firebase Config Loaded:', firebaseConfig);

if (!firebaseConfig.apiKey) {
  throw new Error('Firebase API key is missing from app.config.js and fallback');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User> => {
  try {
    if (Platform.OS === 'web') {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      await AsyncStorage.setItem('userToken', token);
      console.log('Google Sign-In Token:', token);
      return result.user;
    } else {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;
      if (!idToken) throw new Error('No idToken');
      const credential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredentialHelper(auth, credential);
      const token = await result.user.getIdToken();
      await AsyncStorage.setItem('userToken', token);
      console.log('Google Sign-In Token:', token);
      return result.user;
    }
  } catch (error) {
    console.error('Google Auth Error:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    await AsyncStorage.setItem('userToken', token);
    console.log('Email Sign-In Token:', token);
    return result.user;
  } catch (error) {
    console.error('Email Sign-In Error:', error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    await AsyncStorage.setItem('userToken', token);
    console.log('Email Sign-Up Token:', token);
    return result.user;
  } catch (error) {
    console.error('Email Sign-Up Error:', error);
    throw error;
  }
};

export const checkAuthState = async (): Promise<User | null> => {
  const token = await AsyncStorage.getItem('userToken');
  console.log('Checking auth state, token from storage:', token);
  if (!token) return null;

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged user:', user ? user.email : 'null');
      if (user) {
        user.getIdToken(true).then((newToken) => {
          AsyncStorage.setItem('userToken', newToken);
          console.log('Updated token:', newToken);
          resolve(user);
        }).catch((error) => {
          console.error('Token refresh error:', error);
          AsyncStorage.removeItem('userToken');
          resolve(null);
        });
      } else {
        AsyncStorage.removeItem('userToken');
        resolve(null);
      }
      unsubscribe();
    });
  });
};

export const signInWithCredentialHelper = async (authInstance: Auth, credential: AuthCredential): Promise<UserCredential> => {
  return signInWithCredential(authInstance, credential);
};

export { onAuthStateChanged, signInWithEmailAndPassword };