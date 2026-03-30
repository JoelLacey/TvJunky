import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useStore } from '../store/useStore';
import { colors, spacing, typography } from '../theme';
import { Button } from '../components/Button';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

export default function ProfileScreen({ navigation }: Props) {
  const preferences = useStore((state) => state.preferences);
  const updatePreferences = useStore((state) => state.updatePreferences);
  
  const [country, setCountry] = useState(preferences.country);
  const [genreInput, setGenreInput] = useState(preferences.favoriteGenres.join(', '));
  const [servicesInput, setServicesInput] = useState(preferences.streamingServices.join(', '));
  
  const handleSave = () => {
    updatePreferences({ 
      country, 
      favoriteGenres: genreInput.split(',').map(s => s.trim()).filter(Boolean),
      streamingServices: servicesInput.split(',').map(s => s.trim()).filter(Boolean)
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Your Profile</Text>
      <Text style={styles.subtitle}>These preferences tune your AI recommendations.</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Country Code (For Streaming Availabilty)</Text>
        <TextInput 
          style={styles.input}
          value={country}
          onChangeText={setCountry}
          placeholder="e.g. US, UK, CA"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Favorite Genres (comma separated)</Text>
        <TextInput 
          style={styles.input}
          value={genreInput}
          onChangeText={setGenreInput}
          placeholder="Action, Sci-Fi, Thriller"
          placeholderTextColor={colors.textMuted}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>My Streaming Services (comma separated)</Text>
        <TextInput 
          style={styles.input}
          value={servicesInput}
          onChangeText={setServicesInput}
          placeholder="Netflix, Hulu, Max"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <Button title="Save Preferences" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  header: { color: colors.text, fontSize: typography.sizes.xl, fontWeight: 'bold' },
  subtitle: { color: colors.textMuted, fontSize: typography.sizes.sm, marginBottom: spacing.xl, marginTop: spacing.xs },
  section: { marginBottom: spacing.lg },
  label: { color: colors.textMuted, marginBottom: spacing.sm, fontSize: typography.sizes.sm },
  input: { 
    backgroundColor: colors.surface, 
    color: colors.text, 
    borderRadius: 8, 
    padding: spacing.md, 
    borderWidth: 1, 
    borderColor: colors.border 
  }
});
