import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput.js';
import { FaPlus } from 'react-icons/fa';
import ProjectListTable from '../ProjectListTable.jsx';

function ProjectListComponent({ projects, nextPage, onDeleteProject }) {
  const [filterIndex, setFilterIndex] = useState(0);
  const [keyword, onKeywordChange] = useInput('');

  const filterCounts  = {
    all: projects.length,
    ongoing: projects.filter((project) => project.status === 'ON_PROGRESS').length,
    completed: projects.filter((project) => project.status === 'COMPLETED').length,
    onHold: projects.filter((project) => project.status === 'ON_HOLD').length,
  };

  const filters = [
    { label: 'Semua', count: filterCounts.all },
    { label: 'On Going', count: filterCounts.ongoing },
    { label: 'Completed', count: filterCounts.completed },
    { label: 'On Hold', count: filterCounts.onHold },
  ];

  return (
    <section className="project-list">
      <div className="project-list__header">
        <div className="project-list__header-text">
          <h1>Project</h1>
          <p>Kelola dan pantau seluruh project Anda.</p>
        </div>
        <div className="project-list__header-action">
          <input value={keyword} onChange={onKeywordChange} placeholder="Cari nama project..."/>
          <button onClick={nextPage}><FaPlus/> Upload Project</button>
        </div>
      </div>
      <ul className="project-list__filter">
        {filters.map((filter, index) => (
          <li key={filter.label}
            className={filterIndex === index ? 'project-list__filter-selected' : ''}
            onClick={() => setFilterIndex(index)}
          >{filter.label} ({filter.count})</li>
        ))}
      </ul>
      <ProjectListTable
        projects={projects}
        filterIndex={filterIndex}
        onDeleteProject={onDeleteProject}/>
    </section>
  );
}

ProjectListComponent.propTypes = {
  projects: PropTypes.array.isRequired,
  nextPage: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired
};

export default ProjectListComponent;