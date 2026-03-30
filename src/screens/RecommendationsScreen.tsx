import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useStore } from '../store/useStore';
import { generateRecommendations } from '../api/gemini';
import { colors, spacing, typography } from '../theme';
import { Button } from '../components/Button';
import { WatchProviders } from '../components/WatchProviders';

export default function RecommendationsScreen() {
  const { preferences, history, watchlist, addToWatchlist } = useStore();
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState<any[]>([]);
  const [error, setError] = useState('');

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    const prompt = `
      You are an expert TV and Movie recommendation engine. 
      User Preferences:
      - Country (ISO 3166-1 alpha-2): ${preferences.country}
      - Favorite Genres: ${preferences.favoriteGenres.join(', ')}
      - Expected Streaming Services: ${preferences.streamingServices.join(', ')}
      - Watch History (Title - Rating/5): ${history.map(h => `${h.title} (${h.userRating}/5)`).join(', ')}
      - Already in Watchlist: ${watchlist.map(w => w.title).join(', ')}

      Analyze the user's highly-rated history and favorite genres. Give me exactly 3 tailored recommendations. 
      CRITICAL REALITY CHECKS:
      1. Do NOT recommend anything currently in their Watchlist or Watch History.
      2. You MUST ONLY recommend titles that are currently available to stream, rent, or buy in ${preferences.country}. If they specified "Expected Streaming Services", heavily prioritize titles available on those specific platforms in ${preferences.country}. Do not recommend geographically locked shows.
      
      Return ONLY a valid JSON array of objects with the following structure, no markdown formatting or backticks:
      [
        {
          "title": "Movie or Show Name",
          "type": "movie" or "tv",
          "id": "A real TMDB ID for this item. e.g 550 for Fight Club",
          "likelihood": "A percentage (e.g., 95%) of how likely they are to enjoy it",
          "reasoning": "A 1-sentence explanation of why they will like it based on their history/preferences."
        }
      ]
    `;

    try {
      const responseText = await generateRecommendations(prompt);
      if (!responseText) throw new Error('No response from AI');
      
      // Clean up markdown code blocks if the AI includes them despite instructions
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      setRecs(parsed);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch recommendations. Make sure your Gemini API key is configured in .env');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>AI Recommendations</Text>
      
      {recs.length === 0 && !loading && (
        <View style={styles.emptyState}>
          <Text style={styles.info}>Click the button below to analyze your profile and generate tailored recommendations.</Text>
          <Button title="Generate Recommendations" onPress={fetchRecommendations} />
        </View>
      )}

      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Analyzing your profile...</Text>
        </View>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {recs.map((rec, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{rec.title}</Text>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>{rec.likelihood} Match</Text>
            </View>
          </View>
          <Text style={styles.reasoning}>{rec.reasoning}</Text>
          
          <WatchProviders mediaId={rec.id} mediaType={rec.type} />
          
          <View style={styles.addBtnContainer}>
             <Button 
               title="Add to Watchlist" 
               variant="outline"
               onPress={() => addToWatchlist({ id: rec.id.toString(), title: rec.title, type: rec.type, addedAt: new Date().toISOString() })}
             />
          </View>
        </View>
      ))}

      {recs.length > 0 && !loading && (
        <View style={{ marginTop: spacing.xl }}>
          <Button title="Refresh Recommendations" onPress={fetchRecommendations} variant="secondary" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  header: { color: colors.text, fontSize: typography.sizes.xl, fontWeight: 'bold', marginBottom: spacing.lg },
  emptyState: { alignItems: 'center', marginTop: spacing.xl * 2 },
  info: { color: colors.textMuted, fontSize: typography.sizes.base, textAlign: 'center', marginBottom: spacing.lg },
  loadingBox: { alignItems: 'center', marginTop: spacing.xl * 2 },
  loadingText: { color: colors.primary, marginTop: spacing.md, fontSize: typography.sizes.base, fontWeight: 'bold' },
  error: { color: colors.primary, textAlign: 'center', marginTop: spacing.md },
  card: { backgroundColor: colors.surface, padding: spacing.lg, borderRadius: 12, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  title: { color: colors.text, fontSize: typography.sizes.lg, fontWeight: 'bold', flex: 1, marginRight: spacing.sm },
  scoreBadge: { backgroundColor: colors.success + '20', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 8, borderWidth: 1, borderColor: colors.success },
  scoreText: { color: colors.success, fontWeight: 'bold', fontSize: typography.sizes.sm },
  reasoning: { color: colors.textMuted, fontSize: typography.sizes.sm, lineHeight: 20 },
  addBtnContainer: { marginTop: spacing.lg, alignItems: 'flex-start' }
});
