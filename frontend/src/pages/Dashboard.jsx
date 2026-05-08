import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Sparkles, Navigation, Wallet } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentCity: "",
    destinationCity: "",
    startDate: "",
    endDate: "",
    adults: 1,
    kids: 0,
    vibe: "Relaxed",
    budget: 50,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/results", { state: formData });
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative w-full max-w-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
            Design Your Dream Getaway
          </h1>
          <p className="mt-4 text-slate-600 text-lg">Tell us where you are, and we'll handle the rest.</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          {/* Cities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Navigation size={16} className="text-indigo-500" /> Current City
              </label>
              <input
                type="text"
                name="currentCity"
                value={formData.currentCity}
                onChange={handleChange}
                placeholder="Where are you starting?"
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MapPin size={16} className="text-purple-500" /> Destination City
              </label>
              <input
                type="text"
                name="destinationCity"
                value={formData.destinationCity}
                onChange={handleChange}
                placeholder="Where to? (e.g. Kyoto)"
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-teal-500" /> Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-700"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-teal-500" /> End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-700"
                required
              />
            </div>
          </div>

          {/* Travelers & Vibe */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Users size={16} className="text-blue-500" /> Adults
              </label>
              <select name="adults" value={formData.adults} onChange={handleChange} className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                {[1,2,3,4,5,6].map(num => <option key={num} value={num}>{num}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Users size={16} className="text-sky-500" /> Kids
              </label>
              <select name="kids" value={formData.kids} onChange={handleChange} className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 transition-all">
                {[0,1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" /> Vibe
              </label>
              <select name="vibe" value={formData.vibe} onChange={handleChange} className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 transition-all">
                <option value="Relaxed">Relaxed</option>
                <option value="Adventure">Adventure</option>
                <option value="Budget-Friendly">Budget-Friendly</option>
              </select>
            </div>
          </div>



          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
