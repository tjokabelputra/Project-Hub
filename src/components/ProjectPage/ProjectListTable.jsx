import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import ProjectDetailModal from './ProjectDetailModal.jsx';
import { formatStatus } from '../../util/util.js';
import PaginationComponent from '../PaginationComponent.jsx';
import DeleteProjectModal from './DeleteProjectModal.jsx';
import { useSelector } from 'react-redux';

function ProjectListTable({ projects, pagination, onPageChange, onDeleteProject, onEditProject, onDownloadDocument }) {
  const [displayDetail, setDisplayDetail] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [selectedDeleteProject, setSelectedDeleteProject] = useState(null);

  const authedUser = useSelector((states) => states.authUser);

  const currentPage = pagination?.page || 1;
  const tableSize = pagination?.limit || 10;
  const totalProjects = pagination?.total || 0;
  const totalPages = pagination?.totalPages || 1;

  const startIndex = totalProjects === 0
    ? 0
    : (currentPage - 1) * tableSize;

  const endIndex = Math.min(
    startIndex + projects.length,
    totalProjects
  );

  const displayProjectDetail = (project) => {
    setDisplayDetail(true);
    setSelectedProject(project);
  };

  const displayDeleteConfirmation = (project) => {
    setSelectedDeleteProject(project);
    setDisplayDeleteModal(true);
  };

  return (
    <div className="project-list-layout">
      <table className="project-list-table">
        <thead className="project-list-table__header">
          <tr>
            <td>No</td>
            <td>Nama Proyek</td>
            <td>Kode</td>
            <td>PM</td>
            <td>BP</td>
            <td>Status</td>
            <td>Unit Pengusul</td>
            <td>Unit Kerja</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody className="project-list-table__body">
          {projects.map((project, index) => (
            <tr key={project.id}>
              <td>{startIndex + index + 1}</td>
              <td className="project-list-table__name">{project.nama}</td>
              <td>{project.kodeProject}</td>
              <td>{project.pm.nama}</td>
              <td>{project.bp.nama}</td>
              <td className={`project-list-table__status project-list-table__status-${project.status.toLowerCase().replace(/\s+/g, '_')}`}><p>{formatStatus(project.status)}</p></td>
              <td>{project.unitPengusul.nama}</td>
              <td>
                {Array.isArray(project.unitKerjaDeveloper) &&
                project.unitKerjaDeveloper.length > 0
                  ? project.unitKerjaDeveloper.join(', ')
                  : '-'}
              </td>
              <td className="project-list-table__action">
                <div className="project-list-table__action-buttons">
                  <button
                    className="project-list-table__action-detail"
                    onClick={() => displayProjectDetail(project)}>
                    <FaEye />
                  </button>
                  {authedUser.role !== 'VIEWER' && (
                    <button
                      className="project-list-table__action-edit"
                      onClick={() => onEditProject(project.id)}>
                      <FaPencil />
                    </button>
                  )}
                  {authedUser.role === 'ADMIN' && (
                    <button
                      className="project-list-table__action-delete"
                      onClick={() => displayDeleteConfirmation(project)}>
                      <FaTrash />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationComponent
        type="Project"
        filteredDataLength={totalProjects}
        tableSize={tableSize}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        pageCount={totalPages}
        setCurrentPage={onPageChange}
      />
      { displayDetail && (
        <ProjectDetailModal
          project={selectedProject}
          onDownloadDocument={onDownloadDocument}
          onClose={() => setDisplayDetail(false)}/>
      )}
      {displayDeleteModal && selectedDeleteProject && (
        <DeleteProjectModal
          project={selectedDeleteProject}
          onClose={() => {
            setDisplayDeleteModal(false);
            setSelectedDeleteProject(null);
          }}
          onConfirm={onDeleteProject}/>
      )}
    </div>
  );
}

ProjectListTable.propTypes = {
  projects: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  onEditProject: PropTypes.func.isRequired
};

export default ProjectListTable;
