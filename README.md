# TvJunky 🍿

TvJunky is a lightning-fast, highly personalized TV Show and Movie recommendation engine built purely for the Web using **Expo (React Native)**. It runs entirely in your browser using secure local storage to keep track of your watch history, watchlist, and custom streaming preferences—meaning your personal data never touches a database!

By combining your unique watch history and genre preferences, it uses the **Gemini AI API** to generate highly tailored show recommendations, which are then cross-referenced against the **TMDB API** to tell you exactly where you can stream them in your specific country.

---

## 🚀 Features

- **100% Local Privacy:** Uses Zustand and `window.localStorage` to keep your watch history, preferences, and watchlist securely stored in your browser session. 
- **AI-Powered Discovery:** Analyzes what you've recently watched and highly rated using the **Gemini 2.5 Flash API** to generate 3 tailored recommendations with a probability-of-enjoyment score.
- **Strict Regional Availability:** The AI prompt is aggressively configured to only recommend shows currently streaming in your selected ISO 3166-1 country code (bypassing the common AI hallucination of blindly recommending US-only shows).
- **Where to Watch Interface:** Instantly queries the TMDB API to display dynamic streaming providers (Netflix, Hulu, Prime, etc.) based on your country.
- **Sleek Custom Routing:** Features a custom, extremely lightweight React State router specifically engineered to bypass the layout bugs and 0-height collapses common with native iOS/Android flex wrappers on the web!

---

## 🛠️ Tech Stack

- **Framework:** Expo (React Native tailored specifically for a Web export)
- **State Management:** Zustand (with custom `localStorage` persistence)
- **Navigation:** Custom React State Router (bypasses `@react-navigation/native-stack` web bugs)
- **Artificial Intelligence:** Google Gemini (`REST API fetch` instead of the Node SDK to prevent browser JS crashes)
- **Metadata API:** The Movie Database (TMDB)

---

## 💻 Local Setup & Installation

1. **Clone the repository** (or download the source code).
2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`
3. **Configure API Keys:**
   - Rename the `.env.example` file to `.env`
   - Paste in your valid API keys:
     - `EXPO_PUBLIC_GEMINI_API_KEY`: Get this from Google AI Studio.
     - `EXPO_PUBLIC_TMDB_API_KEY`: Get this from TMDB Developer Portal.
4. **Start the Web Server:**
   \`\`\`bash
   npm run web
   \`\`\`
   *(Note: If you are actively modifying the `AppEntry.js` or `package.json` entry points, make sure to safely clear the Metro cache by running `npx expo start --web -c`)*

5. **Enjoy!** The app will open at `http://localhost:8081` (or whichever port is assigned).

---

## 🐛 Known Web Compatibility Nuances

During development, the underlying React Native Web architecture was heavily hardened for standard browser delivery:
* **AsyncStorage:** React Native's Native Storage library was swapped for native browser `localStorage` to fix fatal JS initialization crashes inside Expo SDK 54.
* **Navigation Containers:** Traditional Native Stack Containers were swapped for standard React state switching because primitive Native Views (which Expo uses to compile iOS interfaces on the web) often collapse into invisible `height: 0` DOM elements. 

These architectural changes make this repository completely bulletproof when running exclusively as a Single Page Application in a Web Browser!
