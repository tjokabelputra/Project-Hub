import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput.js';
import { FaPlus } from 'react-icons/fa';
import ProjectListTable from '../ProjectListTable.jsx';

function ProjectListComponent({ projects, nextPage, onDeleteProject, onEditProject }) {
  const [filterIndex, setFilterIndex] = useState(0);
  const [keyword, onKeywordChange] = useInput('');

  const searchKeyword = keyword.trim().toLowerCase();
  const filteredProjects = searchKeyword.length >= 3
    ? projects.filter((project) => project.name.toLowerCase().includes(searchKeyword)) : projects;

  const filterCounts  = {
    all: filteredProjects.length,
    onProgress: filteredProjects.filter((project) => project.status === 'On Progress').length,
    completed: filteredProjects.filter((project) => project.status === 'Completed').length,
    onHold: filteredProjects.filter((project) => project.status === 'On Hold').length,
  };

  const filters = [
    { label: 'Semua', count: filterCounts.all },
    { label: 'On Progress', count: filterCounts.onProgress },
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
        keyword={keyword}
        onDeleteProject={onDeleteProject}
        onEditProject={onEditProject}/>
    </section>
  );
}

ProjectListComponent.propTypes = {
  projects: PropTypes.array.isRequired,
  nextPage: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  onEditProject: PropTypes.func.isRequired
};

export default ProjectListComponent;