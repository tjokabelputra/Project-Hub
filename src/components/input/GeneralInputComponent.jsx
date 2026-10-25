import React from 'react';
import PropTypes from 'prop-types';

function GeneralInputComponent({ id, label, type = 'text', placeholder, value, onChange, disabled = false, isHigh = false }) {
  return (
    <div className="general-input">
      <label htmlFor={id}>{label}</label>
      { isHigh ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}/>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}/>
      )}
    </div>
  );
}

GeneralInputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isHigh: PropTypes.bool,
};

export default GeneralInputComponent;