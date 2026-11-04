import React, { useEffect, useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import PaginationComponent from '../PaginationComponent.jsx';

function DataListTable({ pms, bps, filterIndex }) {
  const [filteredData, setFilteredData] = useState(pms);
  const [currentPage, setCurrentPage] = useState(1);

  const tableSize = 5;
  const startIndex = (currentPage - 1) * tableSize;
  const endIndex = startIndex + tableSize;

  useEffect(() => {
    const setFilter = () => {
      switch (filterIndex) {
      case 0:
        setFilteredData(pms);
        break;
      case 1:
        setFilteredData(bps);
        break;
      default:
        setFilteredData(pms);
      }
    };

    setFilter();
  }, [pms, bps, filterIndex]);

  return (
    <div className="data-list-layout">
      <table className="data-list-table">
        <thead className="data-list-table__header">
          <tr>
            <td>No</td>
            <td>{filterIndex === 0 ? 'Nama Project Manager' : 'Nama Business Partner'}</td>
            <td>{filterIndex === 0 ? 'Kode Project Manager' : 'Kode Business Partner'}</td>
            <td>Email</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody className="data-list-table__body">
          {filteredData.slice(startIndex, endIndex).map((data, index) => (
            <tr className={data.id}>
              <td>{startIndex + index + 1}</td>
              <td className="data-list-table__name">{data.name}</td>
              <td>{data.code}</td>
              <td>{data.email}</td>
              <td className="data-list-table__action">
                <div className="data-list-table__action-buttons">
                  <button className="data-list-table__action-edit"><FaPencil /></button>
                  <button className="data-list-table__action-delete"><FaTrash /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationComponent
        type={filterIndex === 0 ? 'Project Managers' : 'Business Partners'}
        filteredDataLength={filteredData.length}
        tableSize={tableSize}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default DataListTable;