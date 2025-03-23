import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import HarmonyScreen from '../screens/HarmonyScreen';
import CareScreen from '../screens/CareScreen';
import WonderScreen from '../screens/WonderScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Harmony" component={HarmonyScreen} />
        <Stack.Screen name="Care" component={CareScreen} />
        <Stack.Screen name="Wonder" component={WonderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;