import React from 'react';
import PropTypes from 'prop-types';

function LoadingSpinner({ size = 20 }) {
  return (
    <div
      className="loading-spinner"
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
    />
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.number
};

export default LoadingSpinner;