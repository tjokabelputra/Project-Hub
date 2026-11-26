import React from 'react';
import { formatDateTime, formatLabel } from '../../util/util.js';

function UpdateListTable({ updates }) {
  return (
    <div className="history-list-layout">
      <table className="history-list-table">
        <thead className="history-list-table__header">
          <tr>
            <td>Tanggal & Jam</td>
            <td>Status</td>
            <td>Aktivitas</td>
            <td>Kendala/Isu</td>
            <td>Next Action</td>
            <td>Diupdate Oleh</td>
          </tr>
        </thead>
        <tbody className="history-list-table__body">
          {updates.map((update) => (
            <tr key={update.id}>
              <td>{formatDateTime(update.tanggalInput)}</td>
              <td>
                <p className={`history-list-table__status history-list-table__status-${update.status.toLowerCase()}`}>{formatLabel(update.status)}</p>
              </td>
              <td>{update.aktivitas}</td>
              <td>{update.kendala}</td>
              <td>{update.nextAction}</td>
              <td>{update.modifiedBy?.nama || '-'}</td>
            </tr>
          ))}
          {updates.length === 0 && (
            <tr>
              <td colSpan={6}>Belum ada riwayat perubahan.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UpdateListTable;
