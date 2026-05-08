# 🌴 Holiday Planner - AI Powered Travel Assistant

A modern, full-stack travel planning application that uses **Google Gemini 3 Flash** to generate personalized, real-time holiday itineraries, hotel recommendations, and flight options based on your preferences.

## 🚀 Features
- **AI-Powered Search**: Get real airline routes, hotels, and attractions tailored to your "vibe" and budget.
- **Dynamic Results**: Interactive UI showing weather details, transport options, and "Where to stay".
- **AI Packing List**: Dynamically generated packing checklists based on the destination and weather.
- **Interactive Links**: Click on any hotel or attraction to visit their official website or Wikipedia page.
- **Surprise Me**: Let the AI pick a trending destination for you!

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS (v4), Lucide Icons.
- **Backend**: Java 17, Spring Boot 4, Spring Data JPA (H2 In-Memory DB).
- **AI Engine**: Google Gemini 3 Flash (via Google AI Studio).

---

## 🚦 Getting Started

### Prerequisites
- **Java 17** or higher.
- **Node.js** (v18+) and **npm**.
- **Gemini API Key**: Get it for free at [aistudio.google.com](https://aistudio.google.com/apikey).

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
3. Run the application using Gradle:
   ```bash
   # Windows
   .\gradlew.bat bootRun

   # macOS/Linux
   ./gradlew bootRun
   ```
The backend will start on [http://localhost:8080](http://localhost:8080).

---

### 2. Frontend Setup (React + Vite)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
The frontend will start on [http://localhost:5173](http://localhost:5173).

---

## 🌐 Deployment Notes
- **API Proxy**: The frontend uses a Vite proxy (defined in `vite.config.js`) to redirect `/api` calls to `http://localhost:8080`.
- **CORS**: The backend is configured to allow requests from the frontend origin.
- **Database**: Uses an H2 in-memory database for demonstration purposes (no external DB setup required).

## 📄 License
MIT License - Feel free to use this for your own projects!
