import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';

function SearchableSelectComponent({
  id,
  label,
  placeholder,
  options,
  optionsId = 'id',
  optionsValue = 'name',
  value,
  onValueChange,
  minInput = 3
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  const selectedOption = options.find(
    (option) => String(option[optionsId]) === String(value)
  );

  const filteredOptions  = search.trim().length >= minInput
    ? options.filter((option) => String(option[optionsValue] ?? '')
      .toLowerCase().includes(search.trim().toLowerCase())).slice(0, 10)
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleSelect(option) {
    onValueChange(option[optionsId]);
    setSearch('');
    setIsOpen(false);
  }

  return (
    <div className="searchable-select">
      <label>{label}</label>
      <div className="searchable-select__control">
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={isOpen ? search : selectedOption?.[optionsValue] ?? ''}
          onChange={(event) => {
            setSearch(event.target.value);
            setIsOpen(true);
          }}/>
        <FaChevronDown />
      </div>

      { isOpen && (
        <ul className="searchable-select__list">
          {search.trim().length < minInput ? (
            <li className="searchable-select__empty">Ketik minimal {minInput} karakter untuk mencari</li>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li key={option[optionsId]}>
                <button
                  type="button"
                  className={`searchable-select__option ${
                    String(option[optionsId]) === String(value)
                      ? 'searchable-select__option-selected'
                      : ''
                  }`}
                  onClick={() => handleSelect(option)}>
                  {option[optionsValue]}
                </button>
              </li>
            ))
          ) : (
            <li className="searchable-select__empty">Tidak ada data yang cocok.</li>
          )}
        </ul>
      )}
    </div>
  );
}

SearchableSelectComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  optionId: PropTypes.string,
  optionsValue: PropTypes.string,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  minInput: PropTypes.number,
};

export default SearchableSelectComponent;