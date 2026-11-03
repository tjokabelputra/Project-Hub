import React from 'react';

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

export default LoadingSpinner;