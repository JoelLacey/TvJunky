import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { useStore } from '../store/useStore';
import { colors, spacing, typography } from '../theme';
import { Button } from '../components/Button';
import { WatchHistoryItem } from '../types';

export default function HistoryScreen() {
  const history = useStore((state) => state.history);
  const addToHistory = useStore((state) => state.addToHistory);

  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('5');

  const handleAdd = () => {
    if (!title) return;
    const newItem: WatchHistoryItem = {
      id: Date.now().toString(), // fake ID for manual entry
      title,
      type: 'movie',
      userRating: parseInt(rating) || 5,
      dateWatched: new Date().toISOString(),
    };
    addToHistory(newItem);
    setTitle('');
    setRating('5');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Watch History</Text>
      
      <View style={styles.addSection}>
        <TextInput 
          style={[styles.input, { flex: 2, marginRight: spacing.sm }]}
          value={title}
          onChangeText={setTitle}
          placeholder="Movie/Show title"
          placeholderTextColor={colors.textMuted}
        />
        <TextInput 
          style={[styles.input, { flex: 1, marginRight: spacing.sm }]}
          value={rating}
          onChangeText={setRating}
          placeholder="Rating 1-5"
          keyboardType="numeric"
          placeholderTextColor={colors.textMuted}
        />
        <Button title="Log" onPress={handleAdd} />
      </View>

      {history.length === 0 ? (
        <Text style={styles.empty}>You haven't logged any shows yet. Add some so the AI can learn!</Text>
      ) : (
        <FlatList 
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{new Date(item.dateWatched).toLocaleDateString()}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{item.userRating} / 5</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  header: { color: colors.text, fontSize: typography.sizes.xl, fontWeight: 'bold', marginBottom: spacing.lg },
  addSection: { flexDirection: 'row', marginBottom: spacing.xl },
  input: { backgroundColor: colors.surface, color: colors.text, borderRadius: 8, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  empty: { color: colors.textMuted, fontSize: typography.sizes.base, lineHeight: 24, padding: spacing.md, textAlign: 'center' },
  card: { backgroundColor: colors.surface, padding: spacing.md, borderRadius: 8, marginBottom: spacing.sm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardContent: { flex: 1 },
  title: { color: colors.text, fontSize: typography.sizes.base, fontWeight: 'bold' },
  date: { color: colors.textMuted, fontSize: typography.sizes.sm, marginTop: spacing.xs },
  ratingBadge: { backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 12 },
  ratingText: { color: colors.text, fontSize: typography.sizes.sm, fontWeight: 'bold' }
});
