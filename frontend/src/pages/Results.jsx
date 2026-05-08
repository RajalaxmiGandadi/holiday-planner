import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CloudRain, Sun, Plane, Bed, Map, Loader2 } from "lucide-react";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchData = location.state || {};
  
  const [loading, setLoading] = useState(true);
  const [holidayData, setHolidayData] = useState(null);


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
            {/* Places to Visit */}
            <div className="lg:col-span-2">
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Map className="text-teal-500" /> Top Places to Visit
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <h4 className="font-bold text-slate-800 line-clamp-1">{attraction.name}</h4>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{attraction.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </div>

            {/* Side Column - Flights */}
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Plane className="text-indigo-500" /> Transport Options
                </h2>
                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                  {holidayData?.flights?.map((flight, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                            <Plane className="text-slate-400 w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm">{flight.airline}</h4>
                            <p className="text-xs text-slate-500">{flight.time}</p>
                            <p className="text-[10px] text-slate-400">{flight.duration}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-extrabold text-indigo-600">{flight.price}</span>
                          <p className="text-[10px] text-slate-400">per person</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
        </div>

        {/* Accommodations - Horizontal Scroll Section */}
        <section className="pt-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Bed className="text-purple-500" /> Premium Accommodations
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {holidayData?.hotels?.map((hotel, idx) => (
              <a 
                key={idx} 
                href={hotel.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-none w-80 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 snap-start block group"
              >
                <div className="h-48 w-full overflow-hidden relative">
                  {hotel.image ? (
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <Bed className="text-slate-400" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-slate-800 flex items-center gap-1">
                    <span className="text-yellow-500">★</span> {hotel.rating}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-slate-800 text-lg line-clamp-1">{hotel.name}</h4>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Starting from</p>
                      <span className="font-bold text-xl text-purple-600">{hotel.price}</span>
                      <span className="text-xs text-slate-400">/night</span>
                    </div>
                    <button className="bg-purple-50 text-purple-600 p-2 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <ArrowLeft className="rotate-180 w-5 h-5" />
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

      </main>





    </div>
  );
}
