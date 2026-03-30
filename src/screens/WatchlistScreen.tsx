import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useStore } from '../store/useStore';
import { colors, spacing, typography } from '../theme';

export default function WatchlistScreen() {
  const watchlist = useStore((state) => state.watchlist);
  const removeFromWatchlist = useStore((state) => state.removeFromWatchlist);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Watchlist</Text>
      {watchlist.length === 0 ? (
        <Text style={styles.empty}>Your watchlist is empty.</Text>
      ) : (
        <FlatList 
          data={watchlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.type}>{item.type.toUpperCase()}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromWatchlist(item.id)}>
                <Text style={styles.removeBtn}>Remove</Text>
              </TouchableOpacity>
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
  empty: { color: colors.textMuted, fontSize: typography.sizes.base },
  card: { backgroundColor: colors.surface, padding: spacing.md, borderRadius: 8, marginBottom: spacing.sm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardContent: { flex: 1 },
  title: { color: colors.text, fontSize: typography.sizes.base, fontWeight: 'bold' },
  type: { color: colors.primary, fontSize: typography.sizes.sm, marginTop: spacing.xs },
  removeBtn: { color: colors.textMuted, fontSize: typography.sizes.sm, padding: spacing.xs }
});
