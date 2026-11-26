import React from 'react';
import PropTypes from 'prop-types';
import { formatDateTime, formatLabel } from '../../util/util.js';
import PaginationComponent from '../PaginationComponent.jsx';

function ProjectSearchTableComponent({ projects, pagination, onPageChange }) {
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

  const getLatestStage = (stages = []) => {
    return stages
      .filter((stage) => stage.tanggalRencana)
      .sort(
        (a, b) => new Date(b.tanggalRencana) - new Date(a.tanggalRencana)
      )[0];
  };

  return (
    <div className="project-search-table-layout">
      <table className="project-search-table">
        <thead className="project-search-table__header">
          <tr>
            <td>No</td>
            <td>Nama Project</td>
            <td>Kode Project</td>
            <td>Status</td>
            <td>Tahapan Komite</td>
            <td>PIC</td>
            <td>Tanggal Update</td>
          </tr>
        </thead>
        <tbody className="project-search-table__body">
          {projects.map((project, index) => (
            <tr key={project.id}>
              <td>{startIndex + index + 1}</td>
              <td>{project.nama}</td>
              <td>{project.kodeProject}</td>
              <td>{formatLabel(project.status)}</td>
              <td>{formatLabel(getLatestStage(project.stages)?.tahap || '-')}</td>
              <td>{project.ownerPic}</td>
              <td>{formatDateTime(project.updatedAt)}</td>
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
    </div>
  );
}

ProjectSearchTableComponent.propTypes = {
  projects: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default ProjectSearchTableComponent;