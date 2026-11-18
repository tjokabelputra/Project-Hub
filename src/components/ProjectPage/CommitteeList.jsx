import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatLabel } from '../../util/util.js';

function CommitteeList({ stages = [] }) {
  return (
    <div className="committee-list-layout">
      <table className="committee-list-table">
        <thead className="committee-list-table__header">
          <tr>
            <td>Tahapan</td>
            <td>Tanggal Rencana</td>
            <td>Status</td>
            <td>Catatan</td>
          </tr>
        </thead>
        <tbody className="committee-list-table__body">
          {stages.map((stage) => (
            <tr key={stage.id}>
              <td>{formatLabel(stage.tahap)}</td>
              <td>
                {stage.tanggalRencana
                  ? formatDate(stage.tanggalRencana)
                  : '-'}
              </td>
              <td>{formatLabel(stage.status)}</td>
              <td>{stage.catatan || '-'}</td>
            </tr>
          ))}
          {stages.length === 0 && (
            <tr>
              <td colSpan={4}>Tidak ada tahapan project.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

CommitteeList.propTypes = {
  stages: PropTypes.array
};

export default CommitteeList;
