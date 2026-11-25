import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import ProjectListTable from '../ProjectListTable.jsx';
import { useSelector, useDispatch } from 'react-redux';
import FilterComponent from '../../FilterComponent.jsx';
import { asyncFilterProject, asyncGetProjects } from '../../../states/projects/action.js';

function ProjectListComponent({ projects, pagination, onPageChange, nextPage, onDeleteProject, onEditProject, onDownloadDocument }) {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const [filterIndex, setFilterIndex] = useState(0);

  const filters = [
    { label: 'Semua' },
    { label: 'Draft', status: 'DRAFT' },
    { label: 'Inisiasi', status: 'INISIASI' },
    { label: 'On Progress', status: 'ON_PROGRESS' },
    { label: 'Pending', status: 'PENDING' },
    { label: 'On Hold', status: 'ON_HOLD' },
    { label: 'Selesai', status: 'SELESAI' }
  ];

  const onFilterChange = (index) => {
    setFilterIndex(index);

    const selectedFilter = filters[index];

    if (index === 0) {
      dispatch(asyncGetProjects(1, 10));
      return;
    }

    dispatch(asyncFilterProject({
      page: 1,
      appliedFilter: {
        status: selectedFilter.status
      }
    }));
  };

  return (
    <section className="project-list">
      <div className="project-list__header">
        <div className="project-list__header-text">
          <h1>Project</h1>
          <p>Kelola dan pantau seluruh project Anda.</p>
        </div>
        <div className="project-list__header-action">
          {authUser.role !== 'VIEWER' && (
            <button onClick={nextPage}>
              <FaPlus /> Upload Project
            </button>
          )}
        </div>
      </div>
      <FilterComponent
        filters={filters}
        filterIndex={filterIndex}
        setFilterIndex={onFilterChange}
      />
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
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  onEditProject: PropTypes.func.isRequired,
  onDownloadDocument: PropTypes.func
};

export default ProjectListComponent;