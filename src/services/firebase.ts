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
  UserCredential 
} from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User> => {
  try {
    if (Platform.OS === 'web') {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      await AsyncStorage.setItem('userToken', token);
      return result.user;
    } else {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;
      if (!idToken) throw new Error('No idToken');
      const credential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, credential);
      const token = await result.user.getIdToken();
      await AsyncStorage.setItem('userToken', token);
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
    return result.user;
  } catch (error) {
    console.error('Email Sign-Up Error:', error);
    throw error;
  }
};

export const checkAuthState = async (): Promise<User | null> => {
  const token = await AsyncStorage.getItem('userToken');
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user && token) {
        user.getIdToken().then((newToken) => {
          AsyncStorage.setItem('userToken', newToken);
          resolve(user);
        }).catch(() => resolve(null));
      } else {
        AsyncStorage.removeItem('userToken');
        resolve(null);
      }
    });
  });
};

export const signInWithCredential = async (authInstance: Auth, credential: AuthCredential): Promise<UserCredential> => {
  const { signInWithCredential } = await import('firebase/auth');
  return signInWithCredential(authInstance, credential);
};

export { onAuthStateChanged, signInWithEmailAndPassword };