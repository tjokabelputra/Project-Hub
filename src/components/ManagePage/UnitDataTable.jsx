import React, { useEffect, useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import PaginationComponent from '../PaginationComponent.jsx';

function UnitDataTable({ data, onUnitSelected }) {
  const [currentPage, setCurrentPage] = useState(1);

  const tableSize = 10;
  const startIndex = (currentPage - 1) * tableSize;
  const endIndex = startIndex + tableSize;

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <div className="data-list-layout">
      <table className="data-list-table data-list-table--unit">
        <thead className="data-list-table__header">
          <tr>
            <td>No</td>
            <td>Nama Unit Pengusul</td>
            <td>Dipakai</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody className="data-list-table__body">
          {data.slice(startIndex, endIndex).map((item, index) => (
            <tr key={item.id}>
              <td>{startIndex + index + 1}</td>
              <td className="data-list-table__name">
                {item.nama}
              </td>
              <td>{item._count.projects} Projects</td>
              <td className="data-list-table__action">
                <div className="data-list-table__action-buttons">
                  <button
                    type="button"
                    className="data-list-table__action-edit"
                    title="Edit"
                    onClick={() => onUnitSelected(item)}>
                    <FaPencil />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={4}>Tidak ada data.</td>
            </tr>
          )}
        </tbody>
      </table>
      <PaginationComponent
        type="Requesting Units"
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

export default UnitDataTable;