import React, { useEffect, useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

function ProjectListTable({ projects, filterIndex }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    const setFilter = () => {
      switch (filterIndex) {
      case 0:
        setFilteredProjects(projects);
        break;
      case 1:
        setFilteredProjects(projects.filter((project) => project.status === 'ON_PROGRESS'));
        break;
      case 2:
        setFilteredProjects(projects.filter((project) => project.status === 'COMPLETED'));
        break;
      case 3:
        setFilteredProjects(projects.filter((project) => project.status === 'ON_HOLD'));
        break;
      default:
        setFilteredProjects(projects);
      }
    };

    setFilter();
  }, [projects, filterIndex]);

  const formatStatus = (status) => {
    return status
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const projectStep = (project) => {
    if (project.committeeTIA.status === 'ON_PROGRESS') {
      return 'Komite TI A';
    }
    else if (project.committeeTIB.status === 'ON_PROGRESS') {
      return 'Komite TI B';
    }
    else if (project.preCommittee.status === 'ON_PROGRESS') {
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
          {filteredProjects.map((project, index) => (
            <tr key={project.id}>
              <td>{index + 1}</td>
              <td className="project-list-table__name">{project.name}</td>
              <td>{project.code}</td>
              <td className={`project-list-table__status project-list-table__status-${project.status.toLowerCase()}`}><p>{formatStatus(project.status)}</p></td>
              <td>{projectStep(project)}</td>
              <td className="project-list-table__action">
                <div className="project-list-table__action-buttons">
                  <button className="project-list-table__action-detail">
                    <FaEye />
                  </button>
                  <button className="project-list-table__action-edit">
                    <FaPencil />
                  </button>
                  <button className="project-list-table__action-delete">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="project-list-layout__footer">
        <p>Menampilkan {filteredProjects.length} Projects</p>
      </div>
    </div>
  );
}

export default ProjectListTable;