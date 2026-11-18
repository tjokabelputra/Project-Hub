import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput.js';
import { FaPlus } from 'react-icons/fa';
import ProjectListTable from '../ProjectListTable.jsx';
import FilterComponent from '../../FilterComponent.jsx';
import { useSelector } from 'react-redux';

function ProjectListComponent({ projects, nextPage, onDeleteProject, onEditProject, onDownloadDocument }) {
  const [filterIndex, setFilterIndex] = useState(0);
  const [keyword, onKeywordChange] = useInput('');
  const authUser = useSelector((states) => states.authUser);

  const searchKeyword = keyword.trim().toLowerCase();
  const filteredProjects = searchKeyword.length >= 3
    ? projects.filter((project) => project.nama.toLowerCase().includes(searchKeyword)) : projects;

  const filterCounts  = {
    all: filteredProjects.length,
    draft: filteredProjects.filter((project) => project.status === 'DRAFT').length,
    inisiasi: filteredProjects.filter((project) => project.status === 'INISIASI').length,
    onProgress: filteredProjects.filter((project) => project.status === 'ON_PROGRESS').length,
    pending: filteredProjects.filter((project) => project.status === 'PENDING').length,
    onHold: filteredProjects.filter((project) => project.status === 'ON_HOLD').length,
    selesai: filteredProjects.filter((project) => project.status === 'SELESAI').length
  };

  const filters = [
    { label: 'Semua', count: filterCounts.all },
    { label: 'Draft', count: filterCounts.draft },
    { label: 'Inisiasi', count: filterCounts.inisiasi },
    { label: 'On Progress', count: filterCounts.onProgress },
    { label: 'Pending', count: filterCounts.pending },
    { label: 'On Hold', count: filterCounts.onHold },
    { label: 'Selesai', count: filterCounts.selesai },
  ];

  return (
    <section className="project-list">
      <div className="project-list__header">
        <div className="project-list__header-text">
          <h1>Project</h1>
          <p>Kelola dan pantau seluruh project Anda.</p>
        </div>
        <div className="project-list__header-action">
          <input
            className={authUser.role === 'VIEWER' ? 'project-list__search--right' : ''}
            value={keyword}
            onChange={onKeywordChange}
            placeholder="Cari nama project..."/>
          {authUser.role !== 'VIEWER' && (
            <button onClick={nextPage}><FaPlus/> Upload Project</button>
          )}
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