export default function FilterSidebar({ filters, onFilterChange }) {
  return (
    <aside className="bg-white rounded-2xl p-6 shadow-md border border-border/50 sticky top-24">
      <h3 className="font-bold text-lg text-text-primary mb-6 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
        Filters
      </h3>

      {/* Car Type */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
          Car Type
        </label>
        <div className="flex flex-wrap gap-2">
          {['All', 'Sedan', 'SUV'].map((type) => (
            <button
              key={type}
              onClick={() => onFilterChange({ ...filters, type })}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filters.type === type
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'bg-surface-alt text-text-secondary hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
          Max Daily Rate
        </label>
        <input
          type="range"
          min="500"
          max="3000"
          step="100"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-text-light">₹500</span>
          <span className="text-sm font-bold text-primary">₹{filters.maxPrice.toLocaleString()}</span>
          <span className="text-xs text-text-light">₹3,000</span>
        </div>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
          Sort By
        </label>
        <div className="space-y-2">
          {[
            { value: 'price-asc', label: 'Price: Low → High' },
            { value: 'price-desc', label: 'Price: High → Low' },
            { value: 'rating', label: 'Highest Rating' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange({ ...filters, sort: option.value })}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                filters.sort === option.value
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-surface-alt text-text-secondary hover:bg-primary/5'
              }`}
            >
              {option.label}
              {filters.sort === option.value && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => onFilterChange({ type: 'All', maxPrice: 3000, sort: 'price-asc' })}
        className="w-full py-2.5 rounded-xl border-2 border-dashed border-border text-text-secondary text-sm font-medium hover:border-accent hover:text-accent transition-all"
      >
        Reset Filters
      </button>
    </aside>
  );
}
