// App.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './src/components/common/Button';

/**
 * Main app entry point.
 */
export default function App() {
  return (
    <View style={styles.container}>
      <Button text="Click Me" />
    </View>
  );
}

// App-wide styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});