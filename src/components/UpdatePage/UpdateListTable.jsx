import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { formatDate } from '../../util/util.js';

function UpdateListTable({ updates, onPreviewUpdate, onDeleteUpdate }) {
  return (
    <div className="history-list-layout">
      <table className="history-list-table">
        <thead className="history-list-table__header">
          <tr>
            <td>Tanggal</td>
            <td>Nama Project</td>
            <td>Aktivitas Utama</td>
            <td>Progress/Output</td>
            <td>Kendala/Isu</td>
            <td>Next Action</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody className="history-list-table__body">
          {updates.map((update) => (
            <tr key={update.id}>
              <td>{formatDate(update.date)}</td>
              <td>{update.project}</td>
              <td>{update.activity}</td>
              <td>{update.progress}</td>
              <td>{update.issue}</td>
              <td>{update.nextStep}</td>
              <td className="history-list-table__action">
                <div className="history-list-table__action-buttons">
                  <button type="button" onClick={() => onPreviewUpdate(update)}><FaEye /></button>
                  <button type="button" onClick={() => onDeleteUpdate(update.id)}><FaTrash /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpdateListTable;
