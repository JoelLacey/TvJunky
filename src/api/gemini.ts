const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export const generateRecommendations = async (prompt: string) => {
  if (!apiKey) {
    console.warn('Gemini API Key is missing. Returning fallback.');
    return 'Please configure your Gemini API Key in .env';
  }
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    if (!response.ok) {
      throw new Error('API error: ' + response.statusText);
    }
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (error) {
    console.error('Error with Gemini API:', error);
    throw error;
  }
};
