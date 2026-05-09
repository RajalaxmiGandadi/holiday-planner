# 🌴 Holiday Planner - AI Powered Travel Assistant

A modern, full-stack travel planning application that uses **Google Gemini AI** to generate personalized, real-time holiday itineraries, hotel recommendations, and flight options.

## 🚀 Current Features (Phase 1)
- **AI-Powered Search**: Generates real airline routes, hotels, and attractions based on starting city, destination, and travel dates.
- **Rich Data Sets**: Every search provides at least **7+ options** for flights, hotels, and top attractions to ensure a wide variety of choices.
- **Premium UI Experience**:
  - **Horizontal Hotel Slider**: Smooth horizontal scrolling for premium accommodations.
  - **Flight Sidebar**: Dedicated scrollable section for easy transport comparison.
  - **3-Column Attraction Grid**: Beautifully displayed local sights with descriptions and images.
- **Weather Insights**: Real-time weather summaries for the destination during travel dates.
- **Interactive Links**: Direct links to official websites or Wikipedia for all hotels and attractions.
- **Smart Model Fallback**: Backend system that automatically switches between multiple Gemini models (3-flash, 2.5-flash, etc.) to handle rate limits and ensure high availability.

---

## 🌍 Deployment (Free Tier)

For a free and easy experiment, I recommend using **Render**.

### 1. Backend (Spring Boot)
- **Host on**: [Render](https://render.com/) (Web Service).
- **Environment Variable**: Set `GEMINI_API_KEY` to your Gemini key in the Render dashboard.
- **Build Command**: `./gradlew build -x test`
- **Start Command**: `java -jar build/libs/*.jar` (or use the provided `Dockerfile`).

### 2. Frontend (React)
- **Host on**: [Render](https://render.com/) or [Vercel](https://vercel.com/) (Static Site).
- **Environment Variable**: Set `VITE_API_BASE_URL` to your production backend URL (e.g., `https://your-backend.onrender.com`).
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

---

## 🚦 Local Setup

### Prerequisites
- **Java 17** or higher.
- **Node.js** (v18+) and **npm**.
- **Gemini API Key**: Obtain from [aistudio.google.com](https://aistudio.google.com/apikey).

### 1. Backend Setup
1. Navigate to `backend`.
2. Run: `./gradlew bootRun`
3. (Optional) Set `GEMINI_API_KEY` as an environment variable.

### 2. Frontend Setup
1. Navigate to `frontend`.
2. Run: `npm install` and `npm run dev`.

---

## 🔮 Phase 2 Roadmap
- **"Surprise Me" Button**: AI-picked trending destinations.
- **Travel Style Slider**: Fine-tune budget (Backpacker to Ultra-Luxury).
- **Recommended Packing List**: AI-generated checklists.
- **Multi-Mode Travel**: Support for Trains, Buses, and Local Communication.
- **Personalized Daily Itineraries**: Hour-by-hour travel schedules.

## 📄 License
MIT License
