import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput.js';
import { FaPlus } from 'react-icons/fa';
import ProjectListTable from '../ProjectListTable.jsx';
import FilterComponent from '../../FilterComponent.jsx';

function ProjectListComponent({ projects, nextPage, onDeleteProject, onEditProject, onDownloadDocument }) {
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
      <FilterComponent
        filters={filters}
        filterIndex={filterIndex}
        setFilterIndex={setFilterIndex}
      />
      <ProjectListTable
        projects={projects}
        filterIndex={filterIndex}
        keyword={keyword}
        onDeleteProject={onDeleteProject}
        onEditProject={onEditProject}
        onDownloadDocument={onDownloadDocument}/>
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