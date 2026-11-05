import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateInputs } from '../states/shared/action.js';
import DataListComponent from '../components/ManagePage/sub/DataListComponent.jsx';
import UserInputComponent from '../components/ManagePage/sub/UserInputComponent.jsx';
import useInput from '../hooks/useInput.js';
import { asyncAddPm } from '../states/pms/action.js';
import { asyncAddBp } from '../states/bps/action.js';
import UnitInputComponent from '../components/ManagePage/sub/UnitInputComponent.jsx';
import { asyncAddUnit } from '../states/unit/action.js';

function DataManagementPage() {
  const pms = useSelector((states) => states.pms);
  const bps = useSelector((states) => states.bps);
  const units = useSelector((states) => states.units);
  const dispatch = useDispatch();

  const [pageIndex, setPageIndex] = useState(0);
  const [type, setType] = useState('');
  const [name, onNameChange, setName] = useInput('');
  const [code, onCodeChange, setCode] = useInput('');
  const [email, onEmailChange, setEmail] = useInput('');

  const [unitName, onUnitNameChange, setUnitName] = useInput('');
  const [unitCode, onUnitCodeChange, setUnitCode] = useInput('');

  const newUser = {
    name: name,
    code: code,
    email: email
  };

  const newUnit = {
    name: unitName,
    code: unitCode
  };

  const emptyInput = () => {
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
    setPageIndex(filterIndex === 2 ? 2 : 1);
  };

  const onAddUser = async () => {
    try {
      if (type === 'Project Manager') {
        await dispatch(asyncAddPm(newUser));
      } else if (type === 'Business Partner') {
        await dispatch(asyncAddBp(newUser));
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
      await dispatch(asyncAddUnit(newUnit));

      emptyInput();
      setPageIndex(0);
    }
    catch (error) {
      console.error(error);
      alert(error.message || 'Gagal menambahkan Unit. Silakan coba lagi.');
    }
  };

  return (
    <section className="management-page">
      {pageIndex === 0 && (
        <DataListComponent
          pms={pms}
          bps={bps}
          units={units}
          onAddData={onAddData}/>
      )}
      {pageIndex === 1 && (
        <UserInputComponent
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
          onAddUser={onAddUser}/>
      )}
      {pageIndex === 2 && (
        <UnitInputComponent
          onBackPressed={onBackPressed}
          units={units}
          name={unitName}
          onNameChange={onUnitNameChange}
          code={unitCode}
          onCodeChange={onUnitCodeChange}
          onAddUnit={onAddUnit}
        />
      )}
    </section>
  );
}

export default DataManagementPage;