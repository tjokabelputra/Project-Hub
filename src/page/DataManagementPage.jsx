import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateInputs } from '../states/shared/action.js';
import DataListComponent from '../components/ManagePage/sub/DataListComponent.jsx';
import UserInputComponent from '../components/ManagePage/sub/UserInputComponent.jsx';
import useInput from '../hooks/useInput.js';
import { asyncAddPm, asyncEditPm } from '../states/pms/action.js';
import { asyncAddBp, asyncEditBp } from '../states/bps/action.js';
import UnitInputComponent from '../components/ManagePage/sub/UnitInputComponent.jsx';
import {asyncAddUnit, asyncEditUnit} from '../states/unit/action.js';

function DataManagementPage() {
  const pms = useSelector((states) => states.pms);
  const bps = useSelector((states) => states.bps);
  const units = useSelector((states) => states.units);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState('');

  const [pageIndex, setPageIndex] = useState(0);
  const [type, setType] = useState('');
  const [name, onNameChange, setName] = useInput('');
  const [code, onCodeChange, setCode] = useInput('');
  const [email, onEmailChange, setEmail] = useInput('');

  const [unitName, onUnitNameChange, setUnitName] = useInput('');
  const [unitCode, onUnitCodeChange, setUnitCode] = useInput('');

  const user = {
    name: name,
    code: code,
    email: email
  };

  const unit = {
    name: unitName,
    code: unitCode
  };

  const emptyInput = () => {
    setIsEdit(false);
    setId('');
    setType('');
    setName('');
    setCode('');
    setEmail('');
    setUnitName('');
    setUnitCode('');
  };

  useEffect(() => {
    dispatch(asyncPopulateInputs());
  }, [dispatch]);

  const onBackPressed = () => {
    setPageIndex(0);
    emptyInput();
  };

  const onAddData = (filterIndex) => {
    emptyInput();
    setPageIndex(filterIndex === 2 ? 2 : 1);
  };

  const onSelectData = (filterIndex, data) => {
    if (filterIndex === 2) {
      setId(data.id);
      setUnitName(data.name);
      setUnitCode(data.code);

      setIsEdit(true);
      setPageIndex(2);
    }
    else if (filterIndex === 0 || filterIndex === 1) {
      setId(data.id);
      setName(data.name);
      setCode(data.code);
      setEmail(data.email);
      setType(filterIndex === 0 ? 'Project Manager' : 'Business Partner');

      setIsEdit(true);
      setPageIndex(1);
    }
  };

  const onAddUser = async () => {
    try {
      if (type === 'Project Manager') {
        await dispatch(asyncAddPm(user));
      } else if (type === 'Business Partner') {
        await dispatch(asyncAddBp(user));
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
      await dispatch(asyncAddUnit(unit));

      emptyInput();
      setPageIndex(0);
    }
    catch (error) {
      console.error(error);
      alert(error.message || 'Gagal menambahkan Unit. Silakan coba lagi.');
    }
  };

  const onEditUser = async () => {
    const editedUser = { id: id, ...user };

    try {
      if (type === 'Project Manager') {
        await dispatch(asyncEditPm(editedUser));
      } else if (type === 'Business Partner') {
        await dispatch(asyncEditBp(editedUser));
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
      alert(error.message || `Gagal mengedit ${type}. Silakan coba lagi.`);
    }
  };

  const onEditUnit = async () => {
    const editedUnit = { id: id, ...unit };
    try {
      await dispatch(asyncEditUnit(editedUnit));

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
          onAddData={onAddData}
          onSelectData={onSelectData}/>
      )}
      {pageIndex === 1 && (
        <UserInputComponent
          isEdit={isEdit}
          id={id}
          onBackPressed={onBackPressed}
          bps={bps}
          pms={pms}
          type={type}
          onTypeChange={setType}
          name={name}
          onNameChange={onNameChange}
          code={code}
          onCodeChange={onCodeChange}
          email={email}
          onEmailChange={onEmailChange}
          onAddUser={onAddUser}
          onEditUser={onEditUser}/>
      )}
      {pageIndex === 2 && (
        <UnitInputComponent
          isEdit={isEdit}
          id={id}
          onBackPressed={onBackPressed}
          units={units}
          name={unitName}
          onNameChange={onUnitNameChange}
          code={unitCode}
          onCodeChange={onUnitCodeChange}
          onAddUnit={onAddUnit}
          onEditUnit={onEditUnit}
        />
      )}
    </section>
  );
}

export default DataManagementPage;