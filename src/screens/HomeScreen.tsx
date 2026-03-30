import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../theme';
import { Button } from '../components/Button';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>TvJunky</Text>
      <Text style={styles.subtitle}>Your AI Recommendation Engine</Text>

      <View style={styles.grid}>
        <View style={styles.buttonWrapper}>
           <Button title="Get Recommendations" onPress={() => navigation.navigate('Recommendations')} variant="primary" />
        </View>
        <View style={styles.buttonWrapper}>
           <Button title="Watchlist" onPress={() => navigation.navigate('Watchlist')} variant="secondary" />
        </View>
        <View style={styles.buttonWrapper}>
           <Button title="Watch History" onPress={() => navigation.navigate('History')} variant="secondary" />
        </View>
        <View style={styles.buttonWrapper}>
           <Button title="Profile / Preferences" onPress={() => navigation.navigate('Profile')} variant="outline" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, alignItems: 'center', paddingTop: 100 },
  title: { color: colors.text, fontSize: 40, fontWeight: 'bold', marginBottom: spacing.xs, textAlign: 'center' },
  subtitle: { color: colors.primary, fontSize: typography.sizes.base, marginBottom: spacing.xl * 2, textAlign: 'center' },
  grid: { width: '100%', gap: spacing.md },
  buttonWrapper: { marginBottom: spacing.md }
});
