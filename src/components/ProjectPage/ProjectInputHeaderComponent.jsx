import React from 'react';
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

export default ProjectInputHeaderComponent;