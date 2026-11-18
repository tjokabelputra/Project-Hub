import React from 'react';
import PropTypes from 'prop-types';
import GeneralInputComponent from '../input/GeneralInputComponent.jsx';
import DropdownInputComponent from '../input/DropdownInputComponent.jsx';
import { useSelector } from 'react-redux';
import { formatLabel } from '../../util/util.js';

function StagesInputComponent({ stage, onStageChange, date, onDateChange, status, onStatusChange, notes, onNoteChange, onAddStage }) {
  const isFormComplete = [stage, date, status, notes].every((value) => value.trim() !== '');
  const enums = useSelector((states) => states.enums);

  return (
    <div className="stages-input">
      <div className="stages-input__input-section">
        <DropdownInputComponent
          options={(enums?.tahap || []).map((item) => ({
            id: item,
            value: formatLabel(item)
          }))}
          value={stage}
          onValueChange={onStageChange}
          id="stage" label="Tahapan"
          placeholder="Tahapan" />
        <GeneralInputComponent
          id="date"
          label="Tanggal Rencana"
          type="date"
          placeholder=""
          value={date}
          onChange={onDateChange} />
        <DropdownInputComponent
          options={(enums?.statusTahapan || []).map((item) => ({
            id: item,
            value: formatLabel(item)
          }))}
          value={status}
          onValueChange={onStatusChange}
          id="status"
          label="Status"
          placeholder="Status Tahapan" />
        <GeneralInputComponent
          id="note"
          label="Catatan"
          placeholder="Masukan Catatan Komite."
          value={notes}
          onChange={onNoteChange}
          isHigh={true}/>
      </div>
      <div className="stages-input__action">
        <button
          type="button"
          className={`${isFormComplete ? 'stages-input__add' : 'stages-input__add-disabled'}`}
          onClick={onAddStage}
          disabled={!isFormComplete}>Tambah Tahapan</button>
      </div>
    </div>
  );
}

StagesInputComponent.propTypes = {
  stage: PropTypes.string.isRequired,
  onStageChange: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  notes: PropTypes.string.isRequired,
  onNoteChange: PropTypes.func.isRequired,
  onAddStage: PropTypes.func.isRequired
};

export default StagesInputComponent;
