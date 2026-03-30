import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { tmdbClient } from '../api/tmdb';
import { useStore } from '../store/useStore';
import { colors, spacing, typography } from '../theme';

interface Props {
  mediaId: string;
  mediaType: 'movie' | 'tv';
}

export const WatchProviders = ({ mediaId, mediaType }: Props) => {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const country = useStore(state => state.preferences.country) || 'US';

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await tmdbClient.get(`/${mediaType}/${mediaId}/watch/providers`);
        const countryData = res.data.results[country.toUpperCase()];
        
        if (countryData && countryData.flatrate) {
          setProviders(countryData.flatrate);
        } else {
          setProviders([]);
        }
      } catch (err) {
        console.error('Failed to fetch providers', err);
      } finally {
        setLoading(false);
      }
    };
    if (mediaId && tmdbClient.defaults.params.api_key) {
      fetchProviders();
    } else {
      setLoading(false);
    }
  }, [mediaId, mediaType, country]);

  if (loading) return <ActivityIndicator color={colors.primary} />;

  if (providers.length === 0) {
    return <Text style={styles.noData}>Not streaming in {country}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Streaming on ({country}):</Text>
      <View style={styles.list}>
        {providers.map((p) => (
          <View key={p.provider_id} style={styles.badge}>
            <Text style={styles.badgeText}>{p.provider_name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: spacing.md },
  title: { color: colors.textMuted, fontSize: typography.sizes.sm, marginBottom: spacing.xs },
  list: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  badge: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.sm, paddingVertical: 4 },
  badgeText: { color: colors.text, fontSize: typography.sizes.sm },
  noData: { color: colors.textMuted, fontSize: typography.sizes.sm, fontStyle: 'italic', marginTop: spacing.md }
});
