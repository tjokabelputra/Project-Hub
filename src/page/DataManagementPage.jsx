import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateInputs } from '../states/shared/action.js';
import DataListComponent from '../components/ManagePage/sub/DataListComponent.jsx';
import UserInputComponent from '../components/ManagePage/sub/UserInputComponent.jsx';
import useInput from '../hooks/useInput.js';
import { asyncAddPm } from '../states/pms/action.js';
import { asyncAddBp } from '../states/bps/action.js';

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

  const newUser = {
    name: name,
    code: code,
    email: email
  };

  const emptyInput = () => {
    setType('');
    setName('');
    setCode('');
    setEmail('');
  };

  useEffect(() => {
    dispatch(asyncPopulateInputs());
  }, [dispatch]);

  const onAddData = () => {
    setPageIndex(1);
  };

  const onBackPressed = () => {
    setPageIndex(0);
    emptyInput();
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
    </section>
  );
}

export default DataManagementPage;