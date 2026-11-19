import React from 'react';
import PropTypes from 'prop-types';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { formatDate, formatLabel, formatStatus } from '../../util/util.js';

function ProjectStagesTable({ stageHistory, onEditStage }) {
  return (
    <div className="project-stages">
      <table className={'project-stages-table'}>
        <thead className="project-stages-table__header">
          <tr>
            <td>Tahapan</td>
            <td>Tanggal</td>
            <td>Status</td>
            <td>Catatan</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody className="project-stages-table__body">
          {stageHistory.map((stage, index) => (
            <tr key={`  ${stage.stage}-${stage.date}-${index}`}>
              <td>{formatLabel(stage.stage)}</td>
              <td>{stage.date ? formatDate(stage.date) : '-'}</td>
              <td className={`project-stages-table__status project-stages-table__status-${stage.status.toLowerCase()}`}>
                <p>{formatStatus(stage.status)}</p>
              </td>
              <td>{stage.notes}</td>
              <td className="project-stages-table__action">
                <div className="project-stages-table__action-buttons">
                  <button
                    type="button"
                    aria-label={`Edit tahapan ${stage.stage}`}
                    onClick={() => onEditStage(index)}
                  >
                    <FaEdit />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ProjectStagesTable.propTypes = {
  stageHistory: PropTypes.array.isRequired,
  isDeletable: PropTypes.bool,
  onDeleteStage: PropTypes.func,
  onEditStage: PropTypes.func
};

export default ProjectStagesTable;