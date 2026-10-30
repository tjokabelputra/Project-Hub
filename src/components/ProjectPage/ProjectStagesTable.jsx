import React from 'react';
import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import { formatDate, formatStatus } from '../../util/util.js';

function ProjectStagesTable({ stageHistory, isDeletable = false, onDeleteStage }) {
  return (
    <div className="project-stages">
      <table className={`project-stages-table ${isDeletable ? 'project-stages-table--deletable' : ''}`}>
        <thead className="project-stages-table__header">
          <tr>
            <td>Tahapan</td>
            <td>Tanggal</td>
            <td>Status</td>
            <td>Catatan</td>
            {isDeletable && <td>Aksi</td>}
          </tr>
        </thead>
        <tbody className="project-stages-table__body">
          {stageHistory.map((stage, index) => (
            <tr key={`${stage.stage}-${stage.date}-${index}`}>
              <td>{stage.stage}</td>
              <td>{formatDate(stage.date)}</td>
              <td
                className={`project-stages-table__status 
                  project-stages-table__status-${stage.status.toLowerCase()}`
                }>
                <p>{formatStatus(stage.status)}</p>
              </td>
              <td>{stage.notes}</td>
              {isDeletable && (
                <td className="project-stages-table__action">
                  <button type="button" aria-label={`Hapus tahapan ${stage.stage}`} onClick={() => onDeleteStage(stage.id)}>
                    <FaTrash />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ProjectStagesTable.propTypes = {
  stageHistory: PropTypes.arrayOf(PropTypes.shape({
    stage: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  })).isRequired,
  isDeletable: PropTypes.bool,
  onDeleteStage: PropTypes.func,
};

export default ProjectStagesTable;
