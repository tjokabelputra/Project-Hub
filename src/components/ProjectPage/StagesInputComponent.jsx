import React from 'react';
import PropTypes from 'prop-types';
import GeneralInputComponent from '../input/GeneralInputComponent.jsx';
import DropdownInputComponent from '../input/DropdownInputComponent.jsx';
import { dummyStagesStatus } from '../../data/dummy.js';

function StagesInputComponent({ id, stage, date, onDateChange, status, onStatusChange, note, onNoteChange }) {
  return (
    <div className="stages-input">
      <div className={`stages-input__header stages-input__header-${id}`}>
        <p>{stage}</p>
      </div>
      <div className="stages-input__input-section">
        <GeneralInputComponent
          id="date"
          label="Tanggal Rencana"
          type="date"
          placeholder=""
          value={date}
          onChange={onDateChange} />
        <DropdownInputComponent
          options={dummyStagesStatus}
          value={status}
          onValueChange={onStatusChange}
          id="status"
          label="Status"
          placeholder="Status Tahapan" />
        <GeneralInputComponent
          id="note"
          label="Catatan"
          placeholder="Masukan Catatan Komite."
          value={note}
          onChange={onNoteChange}
          isHigh={true}/>
      </div>
    </div>
  );
}

StagesInputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired,
  onNoteChange: PropTypes.func.isRequired
};

export default StagesInputComponent;