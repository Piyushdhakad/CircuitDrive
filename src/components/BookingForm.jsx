import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cities } from '../data/cars';

export default function BookingForm() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [form, setForm] = useState({
    pickup: '',
    dropoff: '',
    pickupDate: today,
    dropoffDate: tomorrow,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pickup || !form.dropoff) {
      alert('Please select both pickup and drop-off locations.');
      return;
    }
    if (form.pickup === form.dropoff) {
      alert('Pickup and drop-off locations must be different for a one-way trip!');
      return;
    }
    navigate('/cars', { state: form });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="glass-dark rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Pickup */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z"/></svg>
                Pickup City
              </span>
            </label>
            <select
              name="pickup"
              value={form.pickup}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all appearance-none cursor-pointer"
              required
            >
              <option value="" className="text-gray-900">Select city</option>
              {cities.map((c) => (
                <option key={c} value={c} className="text-gray-900">{c}</option>
              ))}
            </select>
          </div>

          {/* Drop-off */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Drop-off City
              </span>
            </label>
            <select
              name="dropoff"
              value={form.dropoff}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all appearance-none cursor-pointer"
              required
            >
              <option value="" className="text-gray-900">Select city</option>
              {cities.map((c) => (
                <option key={c} value={c} className="text-gray-900">{c}</option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Pickup Date
              </span>
            </label>
            <input
              type="date"
              name="pickupDate"
              value={form.pickupDate}
              min={today}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all cursor-pointer"
              required
            />
          </div>

          {/* Drop-off Date */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Drop-off Date
              </span>
            </label>
            <input
              type="date"
              name="dropoffDate"
              value={form.dropoffDate}
              min={form.pickupDate || today}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all cursor-pointer"
              required
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 lg:col-span-1 mt-2 lg:mt-0">
            <button
              type="submit"
              className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-white font-semibold shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-[1.02] active:scale-[0.98] transition-all btn-shine text-sm"
            >
              <span className="flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Find Cars
              </span>
            </button>
          </div>
        </div>

        {/* One-way badge */}
        <div className="mt-4 flex items-center justify-center gap-2 text-white/50 text-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          One-way trips only — no need to return the car!
        </div>
      </div>
    </form>
  );
}
