import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import GeneralInputComponent from '../../input/GeneralInputComponent.jsx';
import DropdownInputComponent from '../../input/DropdownInputComponent.jsx';
import { isEmailValid } from '../../../util/util.js';

function UserInputComponent({ onBackPressed, name, onNameChange, email, onEmailChange, role, onRoleChange, pmId, onPmIdChange, bpId, onBpIdChange, onAddUser }) {
  const isProjectManager = role === 'PM';
  const isBusinessPartner = role === 'BP';

  const emailValid = isEmailValid(email);
  const isPmValid = isProjectManager && pmId.trim() !== '';
  const isBpValid = isBusinessPartner && bpId.trim() !== '';

  const isProfileValid =
        role === 'Admin' || role === 'Viewer' ||
        (isProjectManager && isPmValid) ||
        (isBusinessPartner && isBpValid);

  const isFormValid =
        name.trim() !== '' &&
        emailValid &&
        role.trim() !== '' &&
        isProfileValid;

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
            <GeneralInputComponent
              id="name"
              label="Nama Unit"
              placeholder="Nama"
              value={name}
              onChange={onNameChange} />
            <GeneralInputComponent
              type="email"
              id="email"
              label="Email"
              placeholder="example@gmail.com"
              value={email}
              onChange={onEmailChange} />
            <DropdownInputComponent
              options={[
                { id: 'ADMIN', value: 'Admin' },
                { id: 'PROJECT_MANAGER', value: 'PM' },
                { id: 'BUSINESS_PARTNER', value: 'BP' },
                { id: 'VIEWER', value: 'Viewer' }
              ]}
              value={role}
              onValueChange={onRoleChange}
              id="role"
              label="Role Pengguna"
              placeholder="Pilih Role" />
            { isProjectManager && (
              <GeneralInputComponent
                id="pm"
                label="Kode PM"
                placeholder="PM-XXX"
                value={pmId}
                onChange={onPmIdChange} />
            )}
            { isBusinessPartner && (
              <GeneralInputComponent
                id="bp"
                label="Kode BP"
                placeholder="BP-XXX"
                value={bpId}
                onChange={onBpIdChange}/>
            )}
          </div>
        </div>
        <div className="unit-input__actions">
          <button
            className={`unit-input__action-add ${
              !isFormValid
                ? 'unit-input__action-add-disable'
                : 'unit-input__action-add-enabled'
            }`}
            disabled={!isFormValid}
            onClick={onAddUser}>
                  Tambah Unit <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInputComponent;