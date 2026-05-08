import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = scrolled || !isHome || menuOpen;
  const navBg = isSolid
    ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-primary/10'
    : 'bg-transparent';

  const textColor = isSolid ? 'text-text-primary' : 'text-white';
  const logoColor = isSolid ? 'text-primary' : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg group-hover:shadow-primary/40 transition-shadow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12l2 2 4-4"/>
              </svg>
            </div>
            <div className={`font-bold text-xl tracking-tight transition-colors ${logoColor}`}>
              Circuit<span className="text-accent">Drive</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${textColor}`}>
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <a href="#circuit" className="hover:text-accent transition-colors">Circuit</a>
            <a href="#" className="hover:text-accent transition-colors">About</a>
            <a href="#" className="hover:text-accent transition-colors">Support</a>
            <Link
              to="/"
              className="ml-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent to-accent-dark text-white font-semibold text-sm shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all btn-shine"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg ${textColor}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-3 bg-white rounded-2xl p-4 shadow-xl">
              <Link to="/" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg hover:bg-primary/5 text-text-primary font-medium">Home</Link>
              <a href="#circuit" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg hover:bg-primary/5 text-text-primary font-medium">Circuit</a>
              <a href="#" className="px-4 py-2 rounded-lg hover:bg-primary/5 text-text-primary font-medium">About</a>
              <a href="#" className="px-4 py-2 rounded-lg hover:bg-primary/5 text-text-primary font-medium">Support</a>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="mt-1 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent to-accent-dark text-white font-semibold text-sm text-center shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
