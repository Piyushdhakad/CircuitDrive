import { Link } from 'react-router-dom';

const featureIcons = {
  AC: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 16a4 4 0 01-4-4V6a2 2 0 012-2h12a2 2 0 012 2v6a4 4 0 01-4 4"/><path d="M7 18l2 2M17 18l-2 2M12 18v4"/></svg>
  ),
  GPS: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
  ),
  Bluetooth: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"/></svg>
  ),
  Petrol: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 22V6a2 2 0 012-2h8a2 2 0 012 2v16"/><path d="M15 10h2a2 2 0 012 2v2a2 2 0 002 2h0"/><path d="M3 22h12"/><rect x="6" y="8" width="6" height="4" rx="1"/></svg>
  ),
  Diesel: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 22V6a2 2 0 012-2h8a2 2 0 012 2v16"/><path d="M15 10h2a2 2 0 012 2v2a2 2 0 002 2h0"/><path d="M3 22h12"/><rect x="6" y="8" width="6" height="4" rx="1"/></svg>
  ),
};

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < full ? '#f59e0b' : i === full && hasHalf ? 'url(#half)' : '#e2e8f0'}
          stroke="none"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#f59e0b"/>
              <stop offset="50%" stopColor="#e2e8f0"/>
            </linearGradient>
          </defs>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span className="text-xs text-text-secondary ml-1 font-medium">{rating}</span>
    </div>
  );
}

export default function CarCard({ car, bookingInfo }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-border/50 group">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary-light/10"><span class="text-5xl">🚗</span></div>`;
          }}
        />
        {/* Type badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
          car.type === 'SUV'
            ? 'bg-primary/90 text-white'
            : 'bg-white/90 text-primary border border-primary/20'
        }`}>
          {car.type}
        </span>
        {/* Rating badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-star flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          {car.rating}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-text-primary mb-1 group-hover:text-primary transition-colors">
          {car.name}
        </h3>

        {/* Features */}
        <div className="flex items-center gap-2 mt-2 mb-4 flex-wrap">
          {car.features.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-alt text-text-secondary text-xs font-medium"
            >
              {featureIcons[feature] || null}
              {feature}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-3 border-t border-border/50">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">₹{car.dailyRate.toLocaleString()}</span>
              <span className="text-xs text-text-secondary">/day</span>
            </div>
            <p className="text-xs text-text-light mt-0.5">
              + ₹{car.dropFee.toLocaleString()} one-way drop fee
            </p>
          </div>

          <Link
            to={`/car/${car.id}`}
            state={{ car, bookingInfo }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-white text-sm font-semibold shadow-md shadow-accent/20 hover:shadow-accent/40 hover:scale-105 active:scale-95 transition-all btn-shine"
          >
            Select
          </Link>
        </div>
      </div>
    </div>
  );
}
