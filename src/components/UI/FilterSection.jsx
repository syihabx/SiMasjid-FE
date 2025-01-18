import React from 'react'
import PropTypes from 'prop-types'

const FilterSection = ({ filters, onFilterChange, onApplyFilter, compact = false }) => {
  return (
    <div className={`bg-white ${compact ? 'p-3' : 'p-4'} rounded-lg shadow`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={onFilterChange}
            className="w-full px-2 py-1 border rounded-md text-sm"
            placeholder="Cari judul..."
          />
        </div>
        <div>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={onFilterChange}
            className="w-full px-2 py-1 border rounded-md text-sm"
            placeholder="Dari tanggal"
          />
        </div>
        <div>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={onFilterChange}
            className="w-full px-2 py-1 border rounded-md text-sm"
            placeholder="Sampai tanggal"
          />
        </div>
      </div>
      {!compact && (
        <button
          onClick={onApplyFilter}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
        >
          Terapkan
        </button>
      )}
    </div>
  )
}

FilterSection.propTypes = {
  filters: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  compact: PropTypes.bool
}

export default FilterSection
