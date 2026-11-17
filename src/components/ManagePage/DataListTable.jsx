import React from 'react';
import RoleDataTable from './RoleDataTable.jsx';
import UnitDataTable from './UnitDataTable.jsx';
import UserDataTable from './UserDataTable.jsx';

function DataListPage({ pms, bps, units, users, filterIndex }) {
  switch (filterIndex) {
  case 0:
    return (
      <RoleDataTable
        data={pms}
        role="Project Manager"/>
    );

  case 1:
    return (
      <RoleDataTable
        data={bps}
        role="Business Partner"/>
    );

  case 2:
    return (
      <UnitDataTable data={units}/>
    );

  case 3:
    return <UserDataTable data={users} />;

  default:
    return null;
  }
}

export default DataListPage;