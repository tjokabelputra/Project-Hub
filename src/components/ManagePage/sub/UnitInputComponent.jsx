import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import GeneralInputComponent from '../../input/GeneralInputComponent.jsx';

function UnitInputComponent({ isEdit, onBackPressed, name, onNameChange, onAddUnit, onEditUnit }) {
  const isFormValid = name.trim() !== '';
  return (
    <div className="unit-input">
      <div className="unit-input__header">
        <div
          className="unit-input__back"
          onClick={onBackPressed}>
          <FaArrowLeft />
        </div>
        <h1>Tambah Requesting Unit</h1>
      </div>
      <div className="unit-input__main">
        <div className="unit-input__input-layout">
          <p className="unit-input__title">Informasi Unit</p>
          <div className="unit-input__inputs">
            <GeneralInputComponent
              id="name"
              label="Nama Unit"
              placeholder="Nama"
              value={name}
              onChange={onNameChange} />
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
            onClick={isEdit ? onEditUnit : onAddUnit}>
            {isEdit ? 'Edit Unit' : 'Tambah Unit'} <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnitInputComponent;