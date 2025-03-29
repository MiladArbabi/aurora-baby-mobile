import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from '@rneui/themed';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { checkAuthState } from '../services/firebase';
import { useThemeMode } from '@rneui/themed';
import { rneThemeBase, lightTheme, darkTheme, fonts, spacing, AppTheme } from '../styles/theme';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import ProfileSettingScreen from '../screens/ProfileSettingScreen';
import HarmonyScreen from '../screens/HarmonyScreen';
import CareScreen from '../screens/CareScreen';
import WonderScreen from '../screens/WonderScreen';

export type RootTabParamList = {
  Home: undefined;
  ProfileSettings: undefined;
  Auth: undefined;
  Harmony: undefined;
  Care: undefined;
  Wonder: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { mode } = useThemeMode();

  useEffect(() => {
    const initAuth = async () => {
      const persistedUser = await checkAuthState();
      setUser(persistedUser);
      setLoading(false);
    };
    initAuth();
  }, []);

  // Dynamically update theme based on mode
  const dynamicTheme: AppTheme = {
    colors: mode === 'light' ? lightTheme : darkTheme,
    fonts,
    spacing,
    mode,
  };

  if (loading) {
    return null; // Or a loading component
  }

  return (
    <ThemeProvider theme={rneThemeBase}>
      <StyledThemeProvider theme={dynamicTheme}>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="ProfileSettings" component={ProfileSettingScreen} />
              <Tab.Screen name="Harmony" component={HarmonyScreen} />
              <Tab.Screen name="Care" component={CareScreen} />
              <Tab.Screen name="Wonder" component={WonderScreen} />
            </>
          ) : (
            <Tab.Screen name="Auth" component={AuthScreen} />
          )}
        </Tab.Navigator>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export default AppNavigator;