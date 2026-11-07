import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateInputs } from '../states/shared/action.js';
import DataListComponent from '../components/ManagePage/sub/DataListComponent.jsx';
import UserInputComponent from '../components/ManagePage/sub/UserInputComponent.jsx';
import useInput from '../hooks/useInput.js';
import { asyncAddPm, asyncDeletePm } from '../states/pms/action.js';
import { asyncAddBp, asyncDeleteBp } from '../states/bps/action.js';
import UnitInputComponent from '../components/ManagePage/sub/UnitInputComponent.jsx';
import { asyncAddUnit, asyncDeleteUnit } from '../states/unit/action.js';

function DataManagementPage() {
  const pms = useSelector((states) => states.pms);
  const bps = useSelector((states) => states.bps);
  const units = useSelector((states) => states.units);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState('');

  const [pageIndex, setPageIndex] = useState(0);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [code, onCodeChange, setCode] = useInput('');

  const [unitName, onUnitNameChange, setUnitName] = useInput('');
  const [unitCode, onUnitCodeChange, setUnitCode] = useInput('');

  const user = {
    name: name,
    code: code,
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

  const onDeleteUser = async (type, userId) => {
    try {
      if (type === 'Project Manager') {
        await dispatch(asyncDeletePm(userId));
      } else if (type === 'Business Partner') {
        await dispatch(asyncDeleteBp(userId));
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

  const onDeleteUnit = async (unitId) => {
    try {
      await dispatch(asyncDeleteUnit(unitId));

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
          onDeleteUser={onDeleteUser}
          onDeleteUnit={onDeleteUnit}/>
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
          onNameChange={setName}
          code={code}
          onCodeChange={onCodeChange}
          onAddUser={onAddUser}/>
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
          onAddUnit={onAddUnit}/>
      )}
    </section>
  );
}

export default DataManagementPage;