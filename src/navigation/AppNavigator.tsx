import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged, auth, checkAuthState } from '../services/firebase';
import { User } from 'firebase/auth';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import ProfileSettingScreen from '../screens/ProfileSettingScreen';
import LoadingSpinner from '../components/common/LoadingSpinner';

export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  ProfileSettings: undefined;
  Harmony: undefined;
  Care: undefined;
  Wonder: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const persistedUser = await checkAuthState();
      setUser(persistedUser as User | null);
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return unsubscribe;
    };
    initAuth();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProfileSettings" component={ProfileSettingScreen} />
          <Stack.Screen name="Harmony" component={() => <Text>Harmony Screen</Text>} />
          <Stack.Screen name="Care" component={() => <Text>Care Screen</Text>} />
          <Stack.Screen name="Wonder" component={() => <Text>Wonder Screen</Text>} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;