import React, { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

function DropdownInputComponent({ options, value, onValueChange, id, label, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOptions = options.find((option) => String(option.name) === String(value));

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onValueChange(option.name);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-input" ref={containerRef}>
      <label>{label}</label>
      <button
        id={id}
        type="button"
        className={ `dropdown-input__control ${ isOpen ? 'dropdown-input__control--open' : '' }`}
        onClick={() => setIsOpen((previous) => !previous)}>
        <p className={selectedOptions ? 'dropdown-input__value' : 'dropdown-input__placeholder'}>
          {selectedOptions?.name ?? placeholder}
        </p>
        <FaChevronDown className={`dropdown-input__icon ${isOpen ? 'dropdown-input__icon-open' : ''}`} />
      </button>

      {isOpen && (
        <ul className="dropdown-input__list">
          {options.map((option) => {
            const isSelected = String(option.name) === String(value);
            return (
              <li key={option.id}>
                <button
                  type="button"
                  className={`dropdown-input__option ${
                    isSelected
                      ? 'dropdown-input__option-selected'
                      : ''
                  }`}
                  onClick={() => handleSelect(option)}>
                  {option.name}
                </button>
              </li>
            );
          })}

          {options.length === 0 && (
            <li className="dropdown-input__empty">Tidak ada opsi tersedia.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default DropdownInputComponent;