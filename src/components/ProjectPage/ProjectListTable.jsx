import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import ProjectDetailModal from './ProjectDetailModal.jsx';
import { formatStatus } from '../../util/util.js';

function ProjectListTable({ projects, filterIndex, onDeleteProject, onEditProject }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayDetail, setDisplayDetail] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  const tableSize = 10;
  const pageCount = Math.ceil(filteredProjects.length / tableSize);
  const startIndex = (currentPage - 1) * tableSize;
  const endIndex = startIndex + tableSize;

  const visiblePageCount = 3;
  const startPage = Math.min(
    currentPage,
    Math.max(1, pageCount - visiblePageCount + 1),
  );
  const visiblePages = Array.from(
    {
      length: Math.min(visiblePageCount, pageCount),
    },
    (_, index) => startPage + index
  );

  useEffect(() => {
    const setFilter = () => {
      switch (filterIndex) {
      case 0:
        setFilteredProjects(projects);
        break;
      case 1:
        setFilteredProjects(projects.filter((project) => project.status === 'On Progress'));
        break;
      case 2:
        setFilteredProjects(projects.filter((project) => project.status === 'Completed'));
        break;
      case 3:
        setFilteredProjects(projects.filter((project) => project.status === 'On Hold'));
        break;
      default:
        setFilteredProjects(projects);
      }
    };

    setFilter();
  }, [projects, filterIndex]);

  const displayProjectDetail = (project) => {
    setDisplayDetail(true);
    setSelectedProject(project);
  };

  const projectStep = (project) => {
    if (project.committeeTIA.status === 'On Progress') {
      return 'Komite TI A';
    }
    else if (project.committeeTIB.status === 'On Progress') {
      return 'Komite TI B';
    }
    else if (project.preCommittee.status === 'On Progress') {
      return 'Pra Komite';
    }
    else {
      return 'Inisiasi';
    }
  };

  return (
    <div className="project-list-layout">
      <table className="project-list-table">
        <thead className="project-list-table__header">
          <tr>
            <td>No</td>
            <td>Nama Proyek</td>
            <td>Kode Proyek</td>
            <td>Status</td>
            <td>Tahapan Saat Ini</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody className="project-list-table__body">
          {filteredProjects.slice(startIndex, endIndex).map((project, index) => (
            <tr key={project.id}>
              <td>{startIndex + index + 1}</td>
              <td className="project-list-table__name">{project.name}</td>
              <td>{project.code}</td>
              <td className={`project-list-table__status project-list-table__status-${project.status.toLowerCase().replace(/\s+/g, '_')}`}><p>{formatStatus(project.status)}</p></td>
              <td>{projectStep(project)}</td>
              <td className="project-list-table__action">
                <div className="project-list-table__action-buttons">
                  <button
                    className="project-list-table__action-detail"
                    onClick={() => displayProjectDetail(project)}>
                    <FaEye />
                  </button>
                  <button
                    className="project-list-table__action-edit"
                    onClick={() => onEditProject(project.id)}>
                    <FaPencil />
                  </button>
                  <button
                    className="project-list-table__action-delete"
                    onClick={() => onDeleteProject(project.id)}>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="project-list-layout__footer">
        <p>
          Menampilkan{' '}
          {filteredProjects.length === 0 ? 0 : startIndex + 1}
          {' - '}
          {Math.min(endIndex, filteredProjects.length)}
          {' dari '}
          {filteredProjects.length} project
        </p>
        <div className="project-list-layout__pagination">
          <button
            type="button"
            className={
              currentPage !== 1
                ? 'project-list-layout__page project-list-layout__page--active'
                : 'project-list-layout__page'
            }
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}>
            Sebelumnya
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              type="button"
              className={
                currentPage === page
                  ? 'project-list-layout__page project-list-layout__page--active'
                  : 'project-list-layout__page'
              }
              onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          ))}
          <button
            type="button"
            className={
              currentPage === pageCount || pageCount === 0
                ? 'project-list-layout__page'
                : 'project-list-layout__page project-list-layout__page--active'
            }
            disabled={currentPage === pageCount || pageCount === 0}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Selanjutnya
          </button>
        </div>
      </div>
      { displayDetail && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setDisplayDetail(false)}/>
      )}
    </div>
  );
}

ProjectListTable.propTypes = {
  projects: PropTypes.array.isRequired,
  filterIndex: PropTypes.number.isRequired,
  onDeleteProject: PropTypes.func.isRequired
};

export default ProjectListTable;
