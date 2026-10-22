import React from 'react';
import PropTypes from 'prop-types';

function GeneralInputComponent({ id, label, type, placeholder, value, onChange, disabled = false }) {
  return (
    <div className="general-input">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}/>
    </div>
  );
}

GeneralInputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default GeneralInputComponent;