import React, { useEffect, useMemo } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import DropdownInputComponent from '../../input/DropdownInputComponent.jsx';
import GeneralInputComponent from '../../input/GeneralInputComponent.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAllUsers } from '../../../states/users/action.js';
import SearchableSelectComponent from '../../input/SearchableSelectComponent.jsx';

function UserInputComponent({ onBackPressed, bps, pms, type, onTypeChange, name, onNameChange, code, onCodeChange, onAddUser }) {
  const users = useSelector((states) => states.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetAllUsers());
  }, [dispatch]);

  const isCodeExists = useMemo(() => {
    const users = [...pms, ...bps];

    return users.some((user) =>
      user.code?.trim().toLowerCase() === code.trim().toLowerCase()
    );
  }, [pms, bps, code]);

  const isFormValid =
      type.trim() !== '' &&
      name.trim() !== '' &&
      code.trim() !== '' &&
      !isCodeExists;

  return (
    <div className="user-input">
      <div className="user-input__header">
        <div
          className="user-input__back"
          onClick={onBackPressed}>
          <FaArrowLeft />
        </div>
        <h1>Tambah Pengguna</h1>
      </div>
      <div className="user-input__main">
        <div className="user-input__input-layout">
          <p className="user-input__title">Informasi Pengguna</p>
          <div className="user-input__inputs">
            <DropdownInputComponent
              options={
                [
                  { id: 'PM', value: 'Project Manager' },
                  { id: 'BP', value: 'Business Partner' }
                ]
              }
              value={type}
              onValueChange={onTypeChange}
              id="type"
              label="Tipe Pengguna"
              placeholder="Project Manager / Business Partner"/>
            <SearchableSelectComponent
              optionId="name"
              optionsValue="name"
              id="name"
              label="Nama Pengguna"
              placeholder="Nama"
              options={users}
              value={name}
              onValueChange={onNameChange}/>
            <div className="user-input__code-input">
              <GeneralInputComponent
                id="code"
                label="Kode"
                placeholder="PM-XXX / BP-XXX"
                value={code}
                onChange={onCodeChange} />
              {isCodeExists && code.trim() !== '' && (
                <p className="user-input__error">
                          Kode sudah digunakan.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="user-input__actions">
          <button
            className={`user-input__action-add ${
              !isFormValid
                ? 'user-input__action-add-disable'
                : 'user-input__action-add-enabled'
            }`}
            disabled={!isFormValid}
            onClick={onAddUser}>
            Tambah Pengguna <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInputComponent;