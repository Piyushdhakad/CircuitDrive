import { circuitStops } from '../data/cars';

export default function CircuitRoute() {
  return (
    <section id="circuit" className="py-16 md:py-24 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            The Circuit
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 leading-tight">
            South India's Most Scenic Route
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Drive through 5 stunning destinations — pick up at any city, drop off at another. No return trip needed.
          </p>
        </div>

        {/* Desktop Route */}
        <div className="hidden md:block relative pt-8 pb-12 overflow-hidden">
          <div className="flex items-center w-full max-w-5xl mx-auto relative px-8">
            {circuitStops.map((stop, index) => (
              <div key={stop.city} className={`flex items-center relative group ${index === circuitStops.length - 1 ? 'flex-none' : 'flex-1'}`}>
                
                {/* Node & City */}
                <div className="flex flex-col items-center relative z-10 w-16">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-accent transition-all duration-300 cursor-pointer">
                    <span className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      {index + 1}
                    </span>
                  </div>
                  <span className="absolute top-20 w-32 text-center font-bold text-text-primary text-sm lg:text-base">
                    {stop.city}
                  </span>
                </div>

                {/* Line & Distance */}
                {index < circuitStops.length - 1 && (
                  <div className="flex-1 h-1 bg-gradient-to-r from-primary via-primary-light to-accent relative mx-2">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-white border border-border shadow-sm text-accent text-[11px] lg:text-xs font-bold whitespace-nowrap z-20">
                      {stop.distanceToNext} km
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Route */}
        <div className="md:hidden space-y-0 mt-8 max-w-sm mx-auto">
          {circuitStops.map((stop, index) => (
            <div key={stop.city} className="flex items-start gap-5">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-md z-10 shrink-0">
                  <span className="text-sm font-bold text-primary">{index + 1}</span>
                </div>
                {stop.distanceToNext && (
                  <div className="w-0.5 h-16 bg-gradient-to-b from-primary to-primary-light my-2 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 pl-3">
                      <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold whitespace-nowrap">
                        {stop.distanceToNext} km
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-2.5 pb-6">
                <h4 className="font-bold text-text-primary text-lg">{stop.city}</h4>
                <p className="text-xs text-text-secondary mt-1">Explore this destination</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {[
            { value: '510', label: 'Total KM', icon: '🛣️' },
            { value: '5', label: 'Cities', icon: '🏙️' },
            { value: '6+', label: 'Cars Available', icon: '🚗' },
            { value: '₹1000', label: 'One-way Fee', icon: '💰' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow border border-border/50">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-primary">{stat.value}</div>
              <div className="text-xs text-text-secondary mt-1 uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
