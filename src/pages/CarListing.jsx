import { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';
import FilterSidebar from '../components/FilterSidebar';

export default function CarListing() {
  const location = useLocation();
  const bookingInfo = location.state || {
    pickup: 'Bengaluru',
    dropoff: 'Mysuru',
    pickupDate: new Date().toISOString().split('T')[0],
    dropoffDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
  };

  const [filters, setFilters] = useState({
    type: 'All',
    maxPrice: 3000,
    sort: 'price-asc',
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Filter by type
    if (filters.type !== 'All') {
      result = result.filter((c) => c.type === filters.type);
    }

    // Filter by price
    result = result.filter((c) => c.dailyRate <= filters.maxPrice);

    // Sort
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.dailyRate - b.dailyRate);
        break;
      case 'price-desc':
        result.sort((a, b) => b.dailyRate - a.dailyRate);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [filters]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-surface-alt pt-20 md:pt-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="text-white">Available Cars</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Available Cars
          </h1>

          {/* Trip summary */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z"/></svg>
              {bookingInfo.pickup}
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.6"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {bookingInfo.dropoff}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {formatDate(bookingInfo.pickupDate)} — {formatDate(bookingInfo.dropoffDate)}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="lg:hidden w-full mb-4 py-3 px-4 rounded-xl bg-white border border-border text-text-primary font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          Filters & Sort
          <span className="ml-auto px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-semibold">
            {filteredCars.length}
          </span>
        </button>

        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-72 shrink-0">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Sidebar - Mobile */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white p-6 overflow-y-auto animate-slide-in-right">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-surface-alt"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <FilterSidebar filters={filters} onFilterChange={(f) => { setFilters(f); }} />
              </div>
            </div>
          )}

          {/* Car Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-text-secondary">
                Showing <span className="font-semibold text-text-primary">{filteredCars.length}</span> car{filteredCars.length !== 1 ? 's' : ''}
              </p>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 stagger-children">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} bookingInfo={bookingInfo} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-text-primary mb-2">No cars found</h3>
                <p className="text-text-secondary mb-6">Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => setFilters({ type: 'All', maxPrice: 3000, sort: 'price-asc' })}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
