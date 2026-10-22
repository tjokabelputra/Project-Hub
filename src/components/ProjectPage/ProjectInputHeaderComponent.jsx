import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';

function ProjectInputHeaderComponent({ onBackPressed }) {
  return (
    <div className="project-input__header">
      <div
        className="project-input__back"
        onClick={onBackPressed}>
        <FaArrowLeft />
      </div>
      <h1>Upload Project</h1>
    </div>
  );
}

ProjectInputHeaderComponent.propTypes = {
  onBackPressed: PropTypes.func.isRequired
};

export default ProjectInputHeaderComponent;