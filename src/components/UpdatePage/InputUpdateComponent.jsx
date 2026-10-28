import React from 'react';
import GeneralInputComponent from '../input/GeneralInputComponent.jsx';
import SearchableSelectComponent from '../input/SearchableSelectComponent.jsx';
import DropdownInputComponent from '../input/DropdownInputComponent.jsx';
import { dummyProjectStatus } from '../../data/dummy.js';
import { BiRecycle } from 'react-icons/bi';
import {FaEdit, FaPlus} from 'react-icons/fa';
import { areInputsValid } from '../../util/util.js';

function InputUpdateComponent({ updateInfo, projects, isEdit, onResetInput, onCreateUpdate, onEditUpdate }) {
  const {
    date, onDateChange, project, setProject, status, setStatus, owner, onOwnerChange, activity, onActivityChange,
    progress, onProgressChange, issue, onIssueChange, action, onActionChange, finishDate, onFinishDateChange
  } = updateInfo;

  const listInputs = [date, project, status, activity, progress, issue, action];
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
            onValueChange={setProject} />
          <DropdownInputComponent
            options={dummyProjectStatus}
            value={status}
            onValueChange={setStatus}
            id="status"
            label="Status"
            placeholder="Status" />
          <GeneralInputComponent
            id="owner"
            label="PIC/Owner (Opsional)"
            placeholder="Masukan nama Owner/PIC"
            value={owner}
            onChange={onOwnerChange} />
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
          <GeneralInputComponent
            id="finish"
            type="date"
            label="Tanggal Penyelesaian (Opsional)"
            placeholder=""
            value={finishDate}
            onChange={onFinishDateChange} />
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