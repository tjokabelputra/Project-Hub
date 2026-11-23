import React from 'react';
import RoleDataTable from './RoleDataTable.jsx';
import UnitDataTable from './UnitDataTable.jsx';
import UserDataTable from './UserDataTable.jsx';

function DataListPage({ pms, bps, units, users, filterIndex, onRoleSelected, onUnitSelected }) {
  switch (filterIndex) {
  case 0:
    return (
      <RoleDataTable
        data={pms}
        role="Project Manager"
        onRoleSelected={onRoleSelected}/>
    );

  case 1:
    return (
      <RoleDataTable
        data={bps}
        role="Business Partner"
        onRoleSelected={onRoleSelected}/>
    );

  case 2:
    return (
      <UnitDataTable
        data={units}
        onUnitSelected={onUnitSelected}/>
    );

  case 3:
    return <UserDataTable data={users} />;

  default:
    return null;
  }
}

export default DataListPage;