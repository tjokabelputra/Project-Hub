import React, { useEffect, useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import PaginationComponent from '../PaginationComponent.jsx';

function DataListTable({ pms, bps, units, filterIndex }) {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const tableSize = 5;
  const startIndex = (currentPage - 1) * tableSize;
  const endIndex = startIndex + tableSize;

  const isUnit = filterIndex === 2;

  const paginationType = [
    'Project Managers',
    'Business Partners',
    'Requesting Units'
  ][filterIndex] || 'Project Managers';

  useEffect(() => {
    const setFilter = () => {
      switch (filterIndex) {
      case 0:
        setFilteredData(pms);
        break;
      case 1:
        setFilteredData(bps);
        break;
      case 2:
        setFilteredData(units);
        break;
      default:
        setFilteredData(pms);
      }
    };

    setFilter();
  }, [pms, bps, units, filterIndex]);

  return (
    <div className="data-list-layout">
      <table className={`data-list-table ${isUnit ? 'data-list-table--unit' : ''}`}>
        <thead className="data-list-table__header">
          <tr>
            <td>No</td>
            <td>
              {isUnit
                ? 'Nama Unit Pengusul'
                : filterIndex === 0
                  ? 'Nama Project Manager'
                  : 'Nama Business Partner'}
            </td>
            <td>
              {isUnit
                ? 'Kode Unit'
                : filterIndex === 0
                  ? 'Kode Project Manager'
                  : 'Kode Business Partner'}
            </td>
            {!isUnit && <td>Email</td>}
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody className="data-list-table__body">
          {filteredData.slice(startIndex, endIndex).map((data, index) => (
            <tr key={data.id}>
              <td>{startIndex + index + 1}</td>
              <td className="data-list-table__name">
                {data.name}
              </td>
              <td>{data.code}</td>

              {!isUnit && (
                <td>{data.email}</td>
              )}
              <td className="data-list-table__action">
                <div className="data-list-table__action-buttons">
                  <button className="data-list-table__action-edit">
                    <FaPencil />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td colSpan={isUnit ? 4 : 5}>
                  Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <PaginationComponent
        type={paginationType}
        filteredDataLength={filteredData.length}
        tableSize={tableSize}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default DataListTable;