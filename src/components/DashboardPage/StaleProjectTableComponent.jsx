import React from 'react';
import { formatDateTime, formatLabel } from '../../util/util.js';

function StaleProjectTableComponent({ staleProjects = [] }) {
  return (
    <div className="stale-project-table-layout">
      <table className="stale-project-table">
        <thead className="stale-project-table__header">
          <tr>
            <td>Nama Project</td>
            <td>Kode Project</td>
            <td>Status</td>
            <td>PIC</td>
            <td>Update Progress Terakhir</td>
          </tr>
        </thead>
        <tbody className="stale-project-table__body">
          {staleProjects.map((item) => (
            <tr key={item.id}>
              <td>{item.nama}</td>
              <td>{item.kodeProject}</td>
              <td>
                <p className={`stale-project-table__status stale-project-table__status-${item.status.toLowerCase()}`}>{formatLabel(item.status)}</p>
              </td>
              <td>{item.ownerPic}</td>
              <td>
                {item.lastProgressAt
                  ? formatDateTime(item.lastProgressAt)
                  : '-'}
                <br />
                <span className="stale-project-table__duration">
                  {Math.floor(item.hoursWithoutUpdate / 24)} hari tanpa update
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaleProjectTableComponent;