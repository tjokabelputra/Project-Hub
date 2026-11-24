import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import ProjectListTable from '../ProjectListTable.jsx';
import '../../FilterComponent.jsx';
import { useSelector } from 'react-redux';

function ProjectListComponent({ projects, pagination, onPageChange, nextPage, onDeleteProject, onEditProject, onDownloadDocument }) {
  const authUser = useSelector((states) => states.authUser);

  return (
    <section className="project-list">
      <div className="project-list__header">
        <div className="project-list__header-text">
          <h1>Project</h1>
          <p>Kelola dan pantau seluruh project Anda.</p>
        </div>
        <div className="project-list__header-action">
          {authUser.role !== 'VIEWER' && (
            <button onClick={nextPage}><FaPlus/> Upload Project</button>
          )}
        </div>
      </div>
      <ProjectListTable
        projects={projects}
        pagination={pagination}
        onPageChange={onPageChange}
        onDeleteProject={onDeleteProject}
        onEditProject={onEditProject}
        onDownloadDocument={onDownloadDocument}
      />
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