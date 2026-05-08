import BookingForm from '../components/BookingForm';
import CircuitRoute from '../components/CircuitRoute';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-dark via-primary-dark to-surface-dark" />
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/5 rounded-full blur-3xl" />
          {/* Road pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 42px)`,
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="text-center mb-10 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-white/80 text-sm font-medium">South India's First One-Way Self-Drive Circuit</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Pick up in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent">City A</span>.
              <br />
              Drop off in <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">City B</span>.
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4 font-light">
              Drive through South India's most scenic tourist circuit — Bengaluru, Mysuru, Coorg, Ooty & Munnar. No return trip needed.
            </p>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 text-white/40 text-sm mb-10">
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Fully Insured
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Verified Cars
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                24/7 Support
              </span>
            </div>
          </div>

          {/* Booking Form */}
          <div className="max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <BookingForm />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.4">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </section>

      {/* Circuit Route */}
      <CircuitRoute />

      {/* How it Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
              Three Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 stagger-children">
            {[
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                ),
                title: 'Choose Your Route',
                desc: 'Select your pickup city and drop-off city from the circuit. Pick your travel dates.',
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5a1 1 0 01-1 1h-1"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                ),
                title: 'Pick Your Car',
                desc: 'Browse our fleet of sedans and SUVs. Filter by type, price, and rating to find your perfect ride.',
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                ),
                title: 'Drive & Drop Off',
                desc: 'Pick up your car and hit the road! Drop it off at your destination — no return trip needed.',
              },
            ].map((step, i) => (
              <div
                key={step.title}
                className="relative text-center p-6 lg:p-8 rounded-2xl bg-surface-alt border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  {i + 1}
                </div>
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-dark via-primary to-primary-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Your South India Road Trip?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Explore 510 km of breathtaking scenery — from the bustling streets of Bengaluru to the misty hills of Munnar.
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-accent to-accent-dark text-white font-bold text-lg shadow-xl shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all btn-shine"
          >
            Start Booking
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </section>
    </div>
  );
}
