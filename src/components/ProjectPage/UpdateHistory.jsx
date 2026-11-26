
import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatDateTime, formatLabel } from '../../util/util.js';

function UpdateHistory({ history = [] }) {
  return (
    <div className="update-history-layout">
      <table className="update-history-table">
        <thead className="update-history-table__header">
          <tr>
            <td>Tanggal &amp; jam</td>
            <td>Tahapan</td>
            <td>Tanggal Rencana</td>
            <td>Status</td>
            <td>Catatan</td>
            <td>Updated by</td>
          </tr>
        </thead>
        <tbody className="update-history-table__body">
          {history.map((item) => {
            const [date, time] = formatDateTime(item.changedAt).split(', ');
            return (
              <tr key={item.id}>
                <td>
                  {date}, <strong>{time}</strong>
                </td>
                <td>{formatLabel(item.tahap)}</td>
                <td>
                  {item.tanggalRencana
                    ? formatDate(item.tanggalRencana)
                    : '-'}
                </td>
                <td>{formatLabel(item.status)}</td>
                <td>{item.catatan || '-'}</td>
                <td>{item.modifiedBy?.nama || '-'}</td>
              </tr>
            );
          })}
          {history.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>Belum ada riwayat perubahan.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

UpdateHistory.propTypes = {
  history: PropTypes.array
};

export default UpdateHistory;
