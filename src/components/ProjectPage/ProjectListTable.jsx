import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import ProjectDetailModal from './ProjectDetailModal.jsx';
import { formatStatus } from '../../util/util.js';
import PaginationComponent from '../PaginationComponent.jsx';

function ProjectListTable({ projects, filterIndex, keyword, onDeleteProject, onEditProject }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayDetail, setDisplayDetail] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const tableSize = 10;
  const startIndex = (currentPage - 1) * tableSize;
  const endIndex = startIndex + tableSize;

  useEffect(() => {
    const setFilter = () => {
      let searchedProjects = projects;
      if (keyword.length >= 3) {
        searchedProjects = projects.filter((project) => project.name.toLowerCase().includes(keyword.toLowerCase()));
      }

      switch (filterIndex) {
      case 0:
        setFilteredProjects(searchedProjects);
        break;
      case 1:
        setFilteredProjects(searchedProjects.filter((project) => project.status === 'On Progress'));
        break;
      case 2:
        setFilteredProjects(searchedProjects.filter((project) => project.status === 'Completed'));
        break;
      case 3:
        setFilteredProjects(searchedProjects.filter((project) => project.status === 'On Hold'));
        break;
      default:
        setFilteredProjects(searchedProjects);
      }
    };

    setFilter();
  }, [projects, filterIndex, keyword]);

  const displayProjectDetail = (project) => {
    setDisplayDetail(true);
    setSelectedProject(project);
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
              <td>{project.currentStage}</td>
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
      <PaginationComponent
        filteredDataLength={filteredProjects.length}
        tableSize={tableSize}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} />
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
  keyword: PropTypes.string.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  onEditProject: PropTypes.func.isRequired
};

export default ProjectListTable;
