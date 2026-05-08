import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  const data = location.state;

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold mb-2">No booking data found</h2>
          <Link to="/" className="text-primary underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const { car, bookingInfo, days, rentalCost, totalCost, bookingId } = data;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-surface-alt pt-20 md:pt-24 relative overflow-hidden">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                backgroundColor: ['#FF6B35', '#028090', '#f59e0b', '#10b981', '#6366f1'][i % 5],
                animation: `fall ${2 + Math.random() * 2}s ease-in forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
          <style>{`
            @keyframes fall {
              to {
                transform: translateY(110vh) rotate(720deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="bg-white rounded-3xl shadow-xl border border-border/50 overflow-hidden animate-fade-in-up">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-success/90 to-success p-8 text-center text-white relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
            </div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Booking Confirmed!</h1>
              <p className="text-white/80">Your road trip awaits</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-6 md:p-8">
            {/* Booking ID */}
            <div className="text-center mb-8">
              <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Booking ID</div>
              <div className="inline-block px-6 py-2 rounded-full bg-primary/10 text-primary font-mono font-bold text-lg tracking-widest">
                {bookingId}
              </div>
            </div>

            {/* Car info */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-alt mb-6">
              <div className="w-20 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center"><span class="text-2xl">🚗</span></div>`;
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-text-primary">{car.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                    car.type === 'SUV' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                  }`}>
                    {car.type}
                  </span>
                  <span className="text-xs text-text-secondary">{car.transmission} • {car.fuel}</span>
                </div>
              </div>
            </div>

            {/* Trip details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
                <div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider">Pickup</div>
                  <div className="font-semibold text-text-primary">{bookingInfo.pickup}</div>
                  <div className="text-sm text-text-secondary">{formatDate(bookingInfo.pickupDate)}</div>
                </div>
              </div>

              <div className="ml-5 border-l-2 border-dashed border-border h-4" />

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
                <div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider">Drop-off</div>
                  <div className="font-semibold text-text-primary">{bookingInfo.dropoff}</div>
                  <div className="text-sm text-text-secondary">{formatDate(bookingInfo.dropoffDate)}</div>
                </div>
              </div>
            </div>

            {/* Payment summary */}
            <div className="bg-surface-alt rounded-2xl p-5 space-y-3 mb-6">
              <h4 className="font-semibold text-sm text-text-secondary uppercase tracking-wider">Payment Summary</h4>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">₹{car.dailyRate.toLocaleString()} × {days} day{days !== 1 ? 's' : ''}</span>
                <span className="font-medium">₹{rentalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">One-way drop fee</span>
                <span className="font-medium">₹{car.dropFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-bold text-text-primary">Total Paid</span>
                <span className="text-xl font-bold text-primary">₹{totalCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => window.print()}
                className="w-full py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all"
              >
                Download Receipt
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-white font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all btn-shine"
              >
                Book Another Trip
              </button>
            </div>

            <p className="text-xs text-text-light text-center mt-6">
              A confirmation email has been sent to your registered email address.
              <br />For support, call <span className="font-medium">+91 8770420710</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
