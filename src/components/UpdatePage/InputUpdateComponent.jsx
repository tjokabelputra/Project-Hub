import React from 'react';
import GeneralInputComponent from '../input/GeneralInputComponent.jsx';
import SearchableSelectComponent from '../input/SearchableSelectComponent.jsx';
import DropdownInputComponent from '../input/DropdownInputComponent.jsx';
import { dummyProjectStatus } from '../../data/dummy.js';
import { BiRecycle } from 'react-icons/bi';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { areInputsValid, formatDate } from '../../util/util.js';

function InputUpdateComponent({ updateInfo, projects, isEdit, onResetInput, onCreateUpdate, onEditUpdate }) {
  const {
    date, onDateChange, project, onProjectChange, status, setStatus, owner, onOwnerChange, activity, onActivityChange,
    progress, onProgressChange, issue, onIssueChange, action, onActionChange, finishDate, onFinishDateChange
  } = updateInfo;

  const listInputs = [date, project, activity, progress, issue, action];
  const isInputValid = areInputsValid(listInputs);

  return (
    <div className="input-update">
      <div className="input-update__layout">
        <div className="input-update__input-section">
          <GeneralInputComponent
            id="date"
            type="date"
            label="Tanggal"
            placeholder=""
            value={date}
            onChange={onDateChange} />
          <SearchableSelectComponent
            id="project"
            label="Project"
            placeholder="Cari nama project..."
            options={projects}
            optionsId = 'id'
            optionsValue = 'name'
            value={project}
            onValueChange={onProjectChange} />
          <DropdownInputComponent
            options={dummyProjectStatus}
            value={status}
            onValueChange={setStatus}
            id="status"
            label="Status"
            placeholder="Status"
            disabled={true}
            accentValue={true} />
          <GeneralInputComponent
            id="owner"
            label="PIC/Owner"
            placeholder="Masukan nama Owner/PIC"
            value={owner}
            onChange={onOwnerChange}
            disabled={true} />
          <GeneralInputComponent
            id="finish"
            type="text"
            label="Tanggal Penyelesaian"
            placeholder=""
            value={finishDate ? formatDate(finishDate) : ''}
            onChange={onFinishDateChange}
            disabled={true} />
          <div className="input-update__wide">
            <GeneralInputComponent
              id="activity"
              label="Aktivitas/Pekerjaan Hari Ini"
              placeholder="Tuliskan aktivitas atau pekerjaan yang dilakukan hari ini..."
              value={activity}
              onChange={onActivityChange}
              isHigh={true}/>
            <GeneralInputComponent
              id="progress"
              label="Progress/Output"
              placeholder="Tuliskan progress atau hasil yang diperoleh hari ini..."
              value={progress}
              onChange={onProgressChange}
              isHigh={true} />
            <GeneralInputComponent
              id="issue"
              label="Kendala/Isu"
              placeholder="Tuliskan kendala yang anda alami hari ini..."
              value={issue}
              onChange={onIssueChange}
              isHigh={true}/>
            <GeneralInputComponent
              id="action"
              label="Next Action"
              placeholder="Tuliskan langkah anda selanjutnya..."
              value={action}
              onChange={onActionChange}
              isHigh={true} />
          </div>
        </div>
        <div className="input-update__action">
          <button
            type="button"
            className="input-update__reset"
            onClick={onResetInput}><BiRecycle/> Reset</button>
          <button
            type="button"
            className={`input-update__create ${!isInputValid ? 'input-update__create-disable' : ''}`}
            onClick={isEdit ? onEditUpdate : onCreateUpdate}
            disabled={!isInputValid}
          >
            {isEdit ? <FaEdit /> : <FaPlus />}
            {isEdit ? ' Edit Update' : ' Generate Update'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputUpdateComponent;
