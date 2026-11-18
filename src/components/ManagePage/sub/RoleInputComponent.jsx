
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import DropdownInputComponent from '../../input/DropdownInputComponent.jsx';
import GeneralInputComponent from '../../input/GeneralInputComponent.jsx';

function RoleInputComponent({ onBackPressed, type, onTypeChange, name, onNameChange, onAddRole }) {
  const isFormValid = type.trim() !== '' && name.trim() !== '';

  return (
    <div className="role-input">
      <div className="role-input__header">
        <div
          className="role-input__back"
          onClick={onBackPressed}>
          <FaArrowLeft />
        </div>
        <h1>Tambah Role</h1>
      </div>
      <div className="role-input__main">
        <div className="role-input__input-layout">
          <p className="role-input__title">Informasi Role</p>
          <div className="role-input__inputs">
            <DropdownInputComponent
              options={[
                { id: 'PM', value: 'Project Manager' },
                { id: 'BP', value: 'Business Partner' }
              ]}
              value={type}
              onValueChange={onTypeChange}
              id="type"
              label="Tipe Pengguna"
              placeholder="Project Manager / Business Partner"
            />
            <GeneralInputComponent
              id="name"
              label="Nama Pengguna"
              placeholder="Nama"
              value={name}
              onChange={onNameChange}
            />
          </div>
        </div>
        <div className="role-input__actions">
          <button
            className={`role-input__action-add ${
              !isFormValid
                ? 'role-input__action-add-disable'
                : 'role-input__action-add-enabled'
            }`}
            disabled={!isFormValid}
            onClick={onAddRole}>
              Tambah Pengguna <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleInputComponent;