import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged, auth } from '../services/firebase';
import { User } from 'firebase/auth';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          initialParams={{
            onGoogleSignIn: () => setUser({ email: 'mock@example.com', uid: 'mock-uid' } as User),
            onEmailSignIn: () => setUser({ email: 'mock@example.com', uid: 'mock-uid' } as User),
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;