import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import HistoryScreen from '../screens/HistoryScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Profile: undefined;
  Watchlist: undefined;
  History: undefined;
  Recommendations: undefined;
};

export default function AppNavigator() {
  const [currentRoute, setCurrentRoute] = useState<keyof RootStackParamList>('Onboarding');

  const navigation: any = {
    navigate: (route: keyof RootStackParamList) => setCurrentRoute(route),
    goBack: () => setCurrentRoute('Home'),
  };

  const renderScreen = () => {
    switch (currentRoute) {
      case 'Onboarding':
        return <OnboardingScreen navigation={navigation} />;
      case 'Home':
        return <HomeScreen navigation={navigation} />;
      case 'Profile':
        return <ProfileScreen navigation={navigation} />;
      case 'Watchlist':
        return <WatchlistScreen />; // Removed navigation prop
      case 'History':
        return <HistoryScreen />; // Removed navigation prop
      case 'Recommendations':
        return <RecommendationsScreen />; // Removed navigation prop
      default:
        return <HomeScreen navigation={navigation} />;
    }
  };

  const showBackButton = currentRoute !== 'Home' && currentRoute !== 'Onboarding';

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0B0F' }}>
      {showBackButton && (
        <TouchableOpacity 
          style={{ paddingHorizontal: 20, paddingTop: 40, paddingBottom: 10, zIndex: 10 }} 
          onPress={() => setCurrentRoute('Home')}
        >
          <Text style={{ color: '#E50914', fontSize: 16, fontWeight: 'bold' }}>← Back to Home</Text>
        </TouchableOpacity>
      )}
      {renderScreen()}
    </View>
  );
}
