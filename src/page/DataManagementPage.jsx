import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateData } from '../states/shared/action.js';
import DataListComponent from '../components/ManagePage/sub/DataListComponent.jsx';
import RoleInputComponent from '../components/ManagePage/sub/RoleInputComponent.jsx';
import useInput from '../hooks/useInput.js';
import { asyncAddPm, asyncEditPm } from '../states/pms/action.js';
import { asyncAddBp, asyncEditBp } from '../states/bps/action.js';
import UnitInputComponent from '../components/ManagePage/sub/UnitInputComponent.jsx';
import {asyncAddUnit, asyncEditUnit} from '../states/unit/action.js';
import UserInputComponent from '../components/ManagePage/sub/UserInputComponent.jsx';
import { asyncAddUser } from '../states/users/action.js';

function DataManagementPage() {
  const pms = useSelector((states) => states.pms);
  const bps = useSelector((states) => states.bps);
  const units = useSelector((states) => states.units);
  const users = useSelector((states) => states.users);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState('');

  const [pageIndex, setPageIndex] = useState(0);

  const [type, setType] = useState('');
  const [name, onNameChange, setName] = useInput('');

  const [unitName, onUnitNameChange, setUnitName] = useInput('');

  const [username, onUsernameChange, setUsername] = useInput('');
  const [email, onEmailChange, setEmail] = useInput('');
  const [role, setRole] = useState('');
  const [pmId, onPmIdChange, setPmId] = useInput('');
  const [bpId, onBpIdChange, setBpId] = useInput('');

  const roleMapping = {
    Admin: 'ADMIN',
    PM: 'PROJECT_MANAGER',
    BP: 'BUSINESS_PARTNER',
    Viewer: 'VIEWER'
  };

  const user = {
    nama: username,
    email: email,
    role: roleMapping[role],
    ...(role === 'PM' && { projectManagerId: pmId }),
    ...(role === 'BP' && { businessPartnerId: bpId })
  };

  const emptyInput = () => {
    setIsEdit(false);
    setId('');
    setType('');
    setName('');
    setUnitName('');
    setUsername('');
    setEmail('');
    setRole('');
    setPmId('');
    setBpId('');
  };

  useEffect(() => {
    dispatch(asyncPopulateData());
  }, [dispatch]);

  const onBackPressed = () => {
    setPageIndex(0);
    emptyInput();
  };

  const onAddData = (filterIndex) => {
    emptyInput();
    setPageIndex(filterIndex === 2 ? 2 : filterIndex === 3 ? 3 : 1);
  };

  const onAddRole = async () => {
    try {
      if (type === 'Project Manager') {
        await dispatch(asyncAddPm(name));
      } else if (type === 'Business Partner') {
        await dispatch(asyncAddBp(name));
      }
      else {
        alert('Tipe pengguna tidak valid!');
        return;
      }

      emptyInput();
      setPageIndex(0);
    }
    catch (error) {
      console.error(error);
      alert(error.message || `Gagal menambahkan ${type}. Silakan coba lagi.`);
    }
  };

  const onAddUnit = async () => {
    try {
      await dispatch(asyncAddUnit(unitName));

      emptyInput();
      setPageIndex(0);
    }
    catch (error) {
      console.error(error);
      alert(error.message || 'Gagal menambahkan Unit. Silakan coba lagi.');
    }
  };

  const onAddUser = async () => {
    try {
      await dispatch(asyncAddUser(user));

      emptyInput();
      setPageIndex(0);
    }
    catch (error) {
      console.error(error);
      alert(error.message || 'Gagal menambahkan Pengguna. Silakan coba lagi.');
    }
  };

  const onRoleSelected = (item, selectedRole) => {
    setId(item.id);
    setType(selectedRole);
    setName(item.nama);
    setIsEdit(true);
    setPageIndex(1);
  };

  const onUnitSelected = (item) => {
    setId(item.id);
    setUnitName(item.nama);
    setIsEdit(true);
    setPageIndex(2);
  };

  const onEditRole = async () => {
    try {
      if (type === 'Project Manager') {
        await dispatch(asyncEditPm({ id, name }));
      }
      else if (type === 'Business Partner') {
        await dispatch(asyncEditBp({ id, name }));
      }
      else {
        alert('Tipe pengguna tidak valid!');
        return;
      }

      emptyInput();
      setPageIndex(0);
    }
    catch (error) {
      console.error(error);
      alert(error.message || 'Gagal mengedit Role. Silakan coba lagi.');
    }
  };

  const onEditUnit = async () => {
    try {
      await dispatch(asyncEditUnit({ id, unitName }));

      emptyInput();
      setPageIndex(0);
    }
    catch (error) {
      console.error(error);
      alert(error.message || 'Gagal mengedit Unit. Silakan coba lagi.');
    }
  };

  return (
    <section className="management-page">
      {pageIndex === 0 && (
        <DataListComponent
          pms={pms}
          bps={bps}
          units={units}
          users={users}
          onAddData={onAddData}
          onRoleSelected={onRoleSelected}
          onUnitSelected={onUnitSelected}/>
      )}
      {pageIndex === 1 && (
        <RoleInputComponent
          isEdit={isEdit}
          id={id}
          onBackPressed={onBackPressed}
          bps={bps}
          pms={pms}
          type={type}
          onTypeChange={setType}
          name={name}
          onNameChange={onNameChange}
          onAddRole={onAddRole}
          onEditRole={onEditRole}/>
      )}
      {pageIndex === 2 && (
        <UnitInputComponent
          isEdit={isEdit}
          id={id}
          onBackPressed={onBackPressed}
          units={units}
          name={unitName}
          onNameChange={onUnitNameChange}
          onAddUnit={onAddUnit}
          onEditUnit={onEditUnit}/>
      )}
      {pageIndex === 3 && (
        <UserInputComponent
          onBackPressed={onBackPressed}
          name={username}
          onNameChange={onUsernameChange}
          email={email}
          onEmailChange={onEmailChange}
          role={role}
          onRoleChange={setRole}
          pmId={pmId}
          onPmIdChange={onPmIdChange}
          bpId={bpId}
          onBpIdChange={onBpIdChange}
          onAddUser={onAddUser}/>
      )}
    </section>
  );
}

export default DataManagementPage;