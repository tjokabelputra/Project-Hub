import React from 'react';
import { FaEye } from 'react-icons/fa';
import {formatDate, formatDateTime} from '../../util/util.js';

function UpdateListTable({ updates, onPreviewUpdate, onDeleteUpdate }) {
  return (
    <div className="history-list-layout">
      <table className="history-list-table">
        <thead className="history-list-table__header">
          <tr>
            <td>Tanggal</td>
            <td>Nama Project</td>
            <td>Progress/Output</td>
            <td>Kendala/Isu</td>
            <td>Next Action</td>
            <td>Terakhir Diupdate</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody className="history-list-table__body">
          {updates.map((update) => (
            <tr key={update.id}>
              <td>{formatDate(update.date)}</td>
              <td>{update.name}</td>
              <td>{update.progress}</td>
              <td>{update.issue}</td>
              <td>{update.nextStep}</td>
              <td>{formatDateTime(update.updatedAt)}</td>
              <td className="history-list-table__action">
                <div className="history-list-table__action-buttons">
                  <button type="button" onClick={() => onPreviewUpdate(update)}><FaEye /></button>
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
