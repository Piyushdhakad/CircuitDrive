import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { cars } from '../data/cars';

export default function CarDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const car = location.state?.car || cars.find((c) => c.id === Number(id));
  const bookingInfo = location.state?.bookingInfo || {
    pickup: 'Bengaluru',
    dropoff: 'Mysuru',
    pickupDate: new Date().toISOString().split('T')[0],
    dropoffDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
  };

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold mb-2">Car not found</h2>
          <Link to="/" className="text-primary underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const pickupDate = new Date(bookingInfo.pickupDate);
  const dropoffDate = new Date(bookingInfo.dropoffDate);
  const days = Math.max(1, Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24)));
  const rentalCost = car.dailyRate * days;
  const totalCost = rentalCost + car.dropFee;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleBookNow = () => {
    navigate('/confirmation', {
      state: {
        car,
        bookingInfo,
        days,
        rentalCost,
        totalCost,
        bookingId: 'CD' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      },
    });
  };

  return (
    <div className="min-h-screen bg-surface-alt pt-20 md:pt-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <Link to="/cars" state={bookingInfo} className="hover:text-white transition-colors">Cars</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="text-white">{car.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Car Details */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up">
            {/* Car Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-border/50">
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-gray-100 to-gray-50">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary-light/10"><span class="text-8xl">🚗</span></div>`;
                  }}
                />
                <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md ${
                  car.type === 'SUV'
                    ? 'bg-primary/90 text-white'
                    : 'bg-white/90 text-primary'
                }`}>
                  {car.type}
                </span>
              </div>
            </div>

            {/* Car Info */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-border/50">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{car.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(car.rating) ? '#f59e0b' : '#e2e8f0'} stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-text-primary">{car.rating}</span>
                    <span className="text-sm text-text-secondary">({car.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">₹{car.dailyRate.toLocaleString()}</div>
                  <div className="text-sm text-text-secondary">per day</div>
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">{car.description}</p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '💺', label: 'Seats', value: car.seats },
                  { icon: '⛽', label: 'Fuel', value: car.fuel },
                  { icon: '⚙️', label: 'Transmission', value: car.transmission },
                  { icon: '📏', label: 'Mileage', value: car.mileage },
                ].map((spec) => (
                  <div key={spec.label} className="p-4 rounded-xl bg-surface-alt text-center">
                    <div className="text-xl mb-1">{spec.icon}</div>
                    <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">{spec.label}</div>
                    <div className="font-semibold text-text-primary text-sm">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wider mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((f) => (
                    <span key={f} className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Booking Summary */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-border/50 sticky top-24">
              <h3 className="font-bold text-lg text-text-primary mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Booking Summary
              </h3>

              {/* Trip info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z"/></svg>
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary">Pickup</div>
                    <div className="font-semibold text-sm text-text-primary">{bookingInfo.pickup}</div>
                    <div className="text-xs text-text-light">{formatDate(bookingInfo.pickupDate)}</div>
                  </div>
                </div>

                {/* Connector */}
                <div className="flex items-center gap-3">
                  <div className="w-10 flex items-center justify-center">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-success to-accent" />
                  </div>
                  <div className="text-xs text-text-light">{days} day{days !== 1 ? 's' : ''} trip</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary">Drop-off</div>
                    <div className="font-semibold text-sm text-text-primary">{bookingInfo.dropoff}</div>
                    <div className="text-xs text-text-light">{formatDate(bookingInfo.dropoffDate)}</div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t border-border/50 pt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Daily rate × {days} day{days !== 1 ? 's' : ''}</span>
                  <span className="font-medium text-text-primary">₹{rentalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">One-way drop fee</span>
                  <span className="font-medium text-text-primary">₹{car.dropFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-border/50 pt-3 flex justify-between">
                  <span className="font-bold text-text-primary">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">₹{totalCost.toLocaleString()}</span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-white font-bold text-lg shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-[1.02] active:scale-[0.98] transition-all btn-shine"
              >
                Book Now
              </button>

              <p className="text-xs text-text-light text-center mt-3">
                Free cancellation up to 24 hours before pickup
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
