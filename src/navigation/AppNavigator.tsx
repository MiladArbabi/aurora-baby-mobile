import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged, auth, checkAuthState } from '../services/firebase';
import { User } from 'firebase/auth';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import ProfileSettingScreen from '../screens/ProfileSettingScreen';
import HarmonyScreen from '../screens/HarmonyScreen';
import CareScreen from '../screens/CareScreen';
import WonderScreen from '../screens/WonderScreen';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  Home: undefined;
  Harmony: undefined;
  Care: undefined;
  Wonder: undefined;
  Auth: undefined;
  ProfileSettings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppNavigator: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const persistedUser = await checkAuthState();
      setUser(persistedUser);
      setLoading(false);
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  if (loading) return <LoadingSpinner />;

  const screenOptions = ({ route }: { route: { name: keyof RootTabParamList } }): BottomTabNavigationOptions => ({
    headerShown: false,
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#666',
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {user ? (
        <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Harmony" component={HarmonyScreen} />
          <Tab.Screen name="Care" component={CareScreen} />
          <Tab.Screen name="Wonder" component={WonderScreen} />
          <Tab.Screen name="ProfileSettings" component={ProfileSettingScreen} options={{ tabBarButton: () => null }} />
        </>
      ) : (
        <Tab.Screen name="Auth" component={AuthScreen} options={{ tabBarButton: () => null }} />
      )}
    </Tab.Navigator>
  );
};

export default AppNavigator;