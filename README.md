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

## 🔮 Phase 2 Roadmap (Upcoming Improvements)

We have exciting plans to make the Holiday Planner even more comprehensive:

### 🌟 New Features
- **"Surprise Me" Button**: Let the AI choose a trending destination for you based on current travel trends.
- **Travel Style Slider**: Fine-tune your budget and luxury preferences (from Backpacker to Ultra-Luxury).
- **Recommended Packing List**: AI-generated checklists tailored specifically to your destination's weather and your travel vibe.

### 🚆 Transportation Enhancements
- **Multi-Mode Travel**: Support for Trains, Buses, and Local Communication options (Metro, Cabs, etc.).
- **Round-Trip Planning**: Integrated onward and return travel options in a single view.

### 📅 Itinerary Deep-Dive
- **Personalized Daily Itineraries**: Hour-by-hour travel schedules generated based on your specific interests and preferences.

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS (v4), Lucide Icons.
- **Backend**: Java 17, Spring Boot 4, Spring Data JPA.
- **AI Engine**: Google Gemini (3-Flash, 2.5-Flash, 2.0-Flash fallback system).

---

## 🚦 Getting Started

### Prerequisites
- **Java 17** or higher.
- **Node.js** (v18+) and **npm**.
- **Gemini API Key**: Obtain from [aistudio.google.com](https://aistudio.google.com/apikey).

---

### 1. Backend Setup (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Open `src/main/resources/application.properties` and add your Gemini API Key:
   ```properties
   gemini.api.key=YOUR_ACTUAL_API_KEY_HERE
   ```
3. Run the application:
   ```bash
   # Windows
   .\gradlew.bat bootRun

   # macOS/Linux
   ./gradlew bootRun
   ```

---

### 2. Frontend Setup (React + Vite)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

## 📄 License
MIT License
