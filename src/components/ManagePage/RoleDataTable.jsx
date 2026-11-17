import React, { useEffect, useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import PaginationComponent from '../PaginationComponent.jsx';

function RoleDataTable({ data, role }) {
  const [currentPage, setCurrentPage] = useState(1);

  const tableSize = 10;
  const startIndex = (currentPage - 1) * tableSize;
  const endIndex = startIndex + tableSize;

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const paginationType = role === 'Project Manager'
    ? 'Project Managers'
    : 'Business Partners';

  return (
    <div className="data-list-layout">
      <table className="data-list-table">
        <thead className="data-list-table__header">
          <tr>
            <th>No</th>
            <th>Nama {role}</th>
            <th>Kode {role}</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody className="data-list-table__body">
          {data.slice(startIndex, endIndex).map((item, index) => (
            <tr key={item.id}>
              <td>{startIndex + index + 1}</td>
              <td className="data-list-table__name">
                {item.name}
              </td>
              <td>{item.code}</td>
              <td>{item.email}</td>
              <td className="data-list-table__action">
                <div className="data-list-table__action-buttons">
                  <button
                    type="button"
                    className="data-list-table__action-edit"
                    title="Edit">
                    <FaPencil />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={5}>Tidak ada data.</td>
            </tr>
          )}
        </tbody>
      </table>
      <PaginationComponent
        type={paginationType}
        filteredDataLength={data.length}
        tableSize={tableSize}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default RoleDataTable;