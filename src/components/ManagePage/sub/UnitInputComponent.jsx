import React, { useMemo } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import GeneralInputComponent from '../../input/GeneralInputComponent.jsx';

function UnitInputComponent({ onBackPressed, units, name, onNameChange, code, onCodeChange, onAddUnit }) {
  const isCodeExists = useMemo(() => {
    return units.some(
      (unit) =>
        unit.code?.trim().toLowerCase() === code.trim().toLowerCase()
    );
  }, [units, code]);

  const isFormValid = name.trim() !== '' && code.trim() !== '' && !isCodeExists;

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
            <div className="unit-input__code-input">
              <GeneralInputComponent
                id="code"
                label="Kode"
                placeholder="XXX"
                value={code}
                onChange={onCodeChange} />
              {isCodeExists && code.trim() !== '' && (
                <p className="unit-input__error">
                                  Kode sudah digunakan.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="unit-input__actions">
          <button
            className={`unit-input__action-add ${!isFormValid ? 'unit-input__action-add-disable' : 'unit-input__action-add-enabled'}`}
            disabled={!isFormValid}
            onClick={onAddUnit}>
                      Tambah Unit <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnitInputComponent;