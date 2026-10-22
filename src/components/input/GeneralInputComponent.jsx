import React from 'react';

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

export default GeneralInputComponent;