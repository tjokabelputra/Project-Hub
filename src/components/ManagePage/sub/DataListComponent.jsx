import React, { useState } from 'react';
import FilterComponent from '../../FilterComponent.jsx';
import { FaPlus } from 'react-icons/fa';
import DataListTable from '../DataListTable.jsx';

function DataListComponent({ pms, bps, onAddData }) {
  const [filterIndex, setFilterIndex] = useState(0);

  const filterCounts = {
    pms: pms.length,
    bps: bps.length
  };

  const filters = [
    { label: 'Project Manager', count: filterCounts.pms },
    { label: 'Business Partner', count: filterCounts.bps }
  ];

  return (
    <section className="data-list">
      <div className="data-list__header">
        <div className="data-list__header-text">
          <h1>Data Management</h1>
          <p>Kelola dan Pantau seluruh data</p>
        </div>
        <button onClick={onAddData}><FaPlus/> Upload Data</button>
      </div>
      <FilterComponent
        filters={filters}
        filterIndex={filterIndex}
        setFilterIndex={setFilterIndex}/>
      <DataListTable
        pms={pms}
        bps={bps}
        filterIndex={filterIndex} />
    </section>
  );
}

export default DataListComponent;