import React from 'react';

function FilterComponent({ filters, filterIndex, setFilterIndex }) {
  return (
    <ul className="filter-component">
      {filters.map((filter, index) => (
        <li
          key={filter.label}
          className={
            filterIndex === index
              ? 'filter-component__filter-selected'
              : ''
          }
          onClick={() => setFilterIndex(index)}
        >
          {filter.label} ({filter.count})
        </li>
      ))}
    </ul>
  );
}

export default FilterComponent;