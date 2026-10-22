import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatStatus } from '../../util/util.js';

function ProjectStagesTable({ projects }) {
  return (
    <div className="project-stages">
      <table className="project-stages-table">
        <thead className="project-stages-table__header">
          <tr>
            <td>Tahapan</td>
            <td>Tanggal Rencana</td>
            <td>Status</td>
            <td>Catatan</td>
          </tr>
        </thead>
        <tbody className="project-stages-table__body">
          <tr>
            <td>Pra Komite</td>
            <td>{formatDate(projects.preCommittee.date)}</td>
            <td
              className={`project-stages-table__status 
                project-stages-table__status-${projects.preCommittee.status.toLowerCase()}`
              }>
              <p>{formatStatus(projects.preCommittee.status)}</p>
            </td>
            <td>{projects.preCommittee.notes}</td>
          </tr>
          <tr>
            <td>Komite TI B</td>
            <td>{formatDate(projects.committeeTIB.date)}</td>
            <td
              className={`project-stages-table__status 
                project-stages-table__status-${projects.committeeTIB.status.toLowerCase()}`
              }>
              <p>{formatStatus(projects.committeeTIB.status)}</p>
            </td>
            <td>{projects.committeeTIB.notes}</td>
          </tr>
          <tr>
            <td>Komite TI A</td>
            <td>{formatDate(projects.committeeTIA.date)}</td>
            <td
              className={`project-stages-table__status 
                project-stages-table__status-${projects.committeeTIA.status.toLowerCase()}`
              }>
              <p>{formatStatus(projects.committeeTIA.status)}</p>
            </td>
            <td>{projects.committeeTIA.notes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

ProjectStagesTable.propTypes = {
  projects: PropTypes.array.isRequired
};

export default ProjectStagesTable;