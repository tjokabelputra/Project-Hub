import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatStatus } from '../../util/util.js';

function ProjectStagesTable({ preCommittee, committeeTIB, committeeTIA }) {
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
            <td>{formatDate(preCommittee.date)}</td>
            <td
              className={`project-stages-table__status 
                project-stages-table__status-${preCommittee.status.toLowerCase().replace(/\s+/g, '_')}`
              }>
              <p>{formatStatus(preCommittee.status)}</p>
            </td>
            <td>{preCommittee.notes}</td>
          </tr>
          <tr>
            <td>Komite TI B</td>
            <td>{formatDate(committeeTIB.date)}</td>
            <td
              className={`project-stages-table__status 
                project-stages-table__status-${committeeTIB.status.toLowerCase().replace(/\s+/g, '_')}`
              }>
              <p>{formatStatus(committeeTIB.status)}</p>
            </td>
            <td>{committeeTIB.notes}</td>
          </tr>
          <tr>
            <td>Komite TI A</td>
            <td>{formatDate(committeeTIA.date)}</td>
            <td
              className={`project-stages-table__status 
                project-stages-table__status-${committeeTIA.status.toLowerCase().replace(/\s+/g, '_')}`
              }>
              <p>{formatStatus(committeeTIA.status)}</p>
            </td>
            <td>{committeeTIA.notes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

ProjectStagesTable.propTypes = {
  preCommittee: PropTypes.object.isRequired,
  committeeTIB: PropTypes.object.isRequired,
  committeeTIA: PropTypes.object.isRequired
};

export default ProjectStagesTable;