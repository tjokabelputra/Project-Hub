import React, { useState } from 'react';
import FilterComponent from '../../FilterComponent.jsx';
import { FaPlus } from 'react-icons/fa';
import DataListTable from '../DataListTable.jsx';

function DataListComponent({ pms, bps, units, onAddData }) {
  const [filterIndex, setFilterIndex] = useState(0);

  const filterCounts = {
    pms: pms.length,
    bps: bps.length,
    units: units.length
  };

  const filters = [
    { label: 'Project Manager', count: filterCounts.pms },
    { label: 'Business Partner', count: filterCounts.bps },
    { label: 'Requesting Unit', count: filterCounts.units }
  ];

  return (
    <section className="data-list">
      <div className="data-list__header">
        <div className="data-list__header-text">
          <h1>Data Management</h1>
          <p>Kelola dan Pantau seluruh data</p>
        </div>
        <button onClick={() => onAddData(filterIndex)}>
          <FaPlus />
          {filterIndex === 2 ? 'Tambah Unit' : 'Tambah Pengguna'}
        </button>
      </div>
      <FilterComponent
        filters={filters}
        filterIndex={filterIndex}
        setFilterIndex={setFilterIndex}/>
      <DataListTable
        pms={pms}
        bps={bps}
        units={units}
        filterIndex={filterIndex} />
    </section>
  );
}

export default DataListComponent;