const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTMDB = async (endpoint: string) => {
  if (!TMDB_API_KEY) throw new Error("TMDB API key is missing");
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`);
  if (!response.ok) {
    throw new Error('TMDB API error: ' + response.status);
  }
  return response.json();
};

export const hasTMDBKey = !!TMDB_API_KEY;
