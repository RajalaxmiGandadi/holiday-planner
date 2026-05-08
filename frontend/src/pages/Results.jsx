import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CloudRain, Sun, Wind, Check, Plane, Bed, Map, BaggageClaim, Loader2 } from "lucide-react";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchData = location.state || {};
  
  const [loading, setLoading] = useState(true);
  const [holidayData, setHolidayData] = useState(null);
  const [showPackingList, setShowPackingList] = useState(false);
  const [packingList, setPackingList] = useState("");
  const [loadingPackingList, setLoadingPackingList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let body = searchData;

        const response = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        setHolidayData(data);
      } catch (error) {
        console.error("Error fetching holiday data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchData]);

  const fetchPackingList = async () => {
    if (packingList) {
        setShowPackingList(true);
        return;
    }
    setLoadingPackingList(true);
    setShowPackingList(true);
    try {
      const response = await fetch("/api/ai/packing-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vibe: holidayData?.vibe || searchData.vibe || "Relaxed" }),
      });
      const data = await response.text();
      setPackingList(data);
    } catch (error) {
      console.error("Error fetching packing list:", error);
    } finally {
      setLoadingPackingList(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-600 font-medium animate-pulse">Curating your perfect getaway...</p>
      </div>
    );
  }

  const destination = holidayData?.destinationCity || searchData.destinationCity || "Unknown";
  const country = holidayData?.country || "";
  const dates = searchData.startDate ? `${searchData.startDate} to ${searchData.endDate}` : "TBD";
  const vibe = holidayData?.vibe || searchData.vibe || "Relaxed";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{destination}{country && `, ${country}`}</h1>
              <p className="text-sm text-slate-500">{dates} • {vibe} Vibe</p>
            </div>
          </div>
          <button 
            onClick={fetchPackingList}
            className="hidden sm:flex bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg font-semibold items-center gap-2 transition-colors border border-indigo-200"
          >
            <BaggageClaim size={18} /> View Packing List
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Weather Summary Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <CloudRain className="text-sky-500" /> Weather Summary
          </h2>
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
            <div>
              <p className="text-sky-100 font-medium">Expected Weather</p>
              <h3 className="text-4xl font-extrabold mt-1">{holidayData?.weather?.temperature || "24°C"}</h3>
              <p className="mt-2 text-lg">{holidayData?.weather?.description || "Mostly Sunny with occasional breeze."}</p>
            </div>
            <Sun size={64} className="text-yellow-300 opacity-90" />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Transport Options */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Plane className="text-indigo-500" /> Transport Options
              </h2>
              <div className="space-y-4">
                {holidayData?.flights?.map((flight, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Plane className="text-slate-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{flight.airline}</h4>
                          <p className="text-sm text-slate-500">{flight.time} • {flight.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-extrabold text-indigo-600">{flight.price}</span>
                        <p className="text-xs text-slate-400">per person</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Places to Visit */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Map className="text-teal-500" /> Top Places to Visit
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {holidayData?.attractions?.map((attraction, i) => (
                  <a 
                    key={i} 
                    href={attraction.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group cursor-pointer rounded-2xl overflow-hidden relative border border-slate-200 shadow-sm hover:shadow-md transition-shadow block"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={attraction.image} 
                        alt={attraction.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h4 className="font-bold text-slate-800">{attraction.name}</h4>
                      <p className="text-sm text-slate-500 mt-1">{attraction.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            
            {/* Accommodations */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Bed className="text-purple-500" /> Where to Stay
              </h2>
              <div className="space-y-4">
                {holidayData?.hotels?.map((hotel, idx) => (
                  <a 
                    key={idx} 
                    href={hotel.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row h-auto sm:h-32 hover:shadow-md transition-shadow block"
                  >
                    <div className="w-full sm:w-32 h-32 sm:h-full overflow-hidden">
                      {hotel.image ? (
                        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <Bed className="text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-800">{hotel.name}</h4>
                        <div className="flex text-yellow-400 text-xs mt-1">
                          {Array.from({ length: Math.floor(parseFloat(hotel.rating)) }).map((_, i) => <span key={i}>★</span>)}
                          {parseFloat(hotel.rating) % 1 !== 0 && <span>☆</span>}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 text-right">
                        <span className="font-bold text-lg text-purple-600">{hotel.price}</span>
                        <span className="text-xs text-slate-400">/night</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

          </div>
        </div>

      </main>

      {/* Floating Mobile Button */}
      <div className="fixed bottom-6 w-full px-4 sm:hidden z-40">
        <button 
          onClick={fetchPackingList}
          className="w-full bg-indigo-600 text-white shadow-xl px-4 py-4 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <BaggageClaim size={20} /> View AI Packing List
        </button>
      </div>

      {/* Packing List Modal */}
      {showPackingList && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50">
              <h2 className="font-bold text-xl text-indigo-900 flex items-center gap-2">
                <BaggageClaim className="text-indigo-600" /> Smart Packing List
              </h2>
              <button onClick={() => setShowPackingList(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <p className="text-sm text-slate-500 mb-6">Generated by Gemini AI based on {vibe} vibe and current weather.</p>
              
              {loadingPackingList ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
                  <p className="text-slate-500 text-sm">Generating your checklist...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="prose prose-slate max-w-none">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 whitespace-pre-wrap text-slate-700 leading-relaxed">
                      {packingList}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 text-sm text-indigo-800 flex gap-2 mt-8">
                    <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>This list was dynamically generated via our AI service.</span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
