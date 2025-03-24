import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { User } from 'firebase/auth';
import { auth, onAuthStateChanged } from '../services/firebase';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import HarmonyScreen from '../screens/HarmonyScreen';
import CareScreen from '../screens/CareScreen';
import WonderScreen from '../screens/WonderScreen';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Auth'}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Harmony" component={HarmonyScreen} />
        <Stack.Screen name="Care" component={CareScreen} />
        <Stack.Screen name="Wonder" component={WonderScreen} />
      </Stack.Navigator>
  );
};

export default AppNavigator;