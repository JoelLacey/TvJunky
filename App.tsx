import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#0B0B0F' }}>
      <AppNavigator />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
