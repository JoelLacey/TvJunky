export type UserPreferences = {
  country: string;
  streamingServices: string[];
  favoriteGenres: string[];
  favoriteActors: string[];
};

export type WatchHistoryItem = {
  id: string; // TMDB ID
  title: string;
  type: 'movie' | 'tv';
  posterPath?: string;
  userRating: number; // 1 to 5 scale
  dateWatched: string;
};

export type WatchlistItem = {
  id: string; // TMDB ID
  title: string;
  type: 'movie' | 'tv';
  posterPath?: string;
  addedAt: string;
};
