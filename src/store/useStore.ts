import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserPreferences, WatchHistoryItem, WatchlistItem } from '../types';

interface AppState {
  preferences: UserPreferences;
  history: WatchHistoryItem[];
  watchlist: WatchlistItem[];
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  addToHistory: (item: WatchHistoryItem) => void;
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: string) => void;
}

const secureStorage = {
  getItem: (name: string) => {
    if (typeof window !== 'undefined') return window.localStorage.getItem(name);
    return null;
  },
  setItem: (name: string, value: string) => {
    if (typeof window !== 'undefined') window.localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (typeof window !== 'undefined') window.localStorage.removeItem(name);
  },
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      preferences: {
        country: 'US',
        streamingServices: [],
        favoriteGenres: [],
        favoriteActors: [],
      },
      history: [],
      watchlist: [],
      updatePreferences: (prefs) => set((state) => ({ preferences: { ...state.preferences, ...prefs } })),
      addToHistory: (item) => set((state) => ({ 
        history: [item, ...state.history],
        watchlist: state.watchlist.filter((w) => w.id !== item.id) 
      })),
      addToWatchlist: (item) => set((state) => {
        if (state.watchlist.some((w) => w.id === item.id)) return state;
        return { watchlist: [item, ...state.watchlist] };
      }),
      removeFromWatchlist: (id) => set((state) => ({
        watchlist: state.watchlist.filter((i) => i.id !== id),
      })),
    }),
    {
      name: 'tvjunky-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
