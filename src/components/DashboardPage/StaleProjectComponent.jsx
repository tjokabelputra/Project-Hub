import React from 'react';
import PropTypes from 'prop-types';
import StaleProjectTableComponent from './StaleProjectTableComponent.jsx';

function StaleProjectComponent({ staleProjects }) {
  return (
    <div className="stale-project">
      <div className="stale-project__header">
        <h3>Project Belum Diupdate</h3>
        <p>Project aktif tanpa update progress selama 24 jam atau lebih</p>
      </div>
      <StaleProjectTableComponent
        staleProjects={staleProjects} />
    </div>
  );
}

StaleProjectComponent.propTypes = {
  staleProjects: PropTypes.array.isRequired
};

export default StaleProjectComponent;