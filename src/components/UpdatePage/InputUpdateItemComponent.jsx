import React from 'react';
import GeneralInputComponent from '../input/GeneralInputComponent.jsx';
import SearchableSelectComponent from '../input/SearchableSelectComponent.jsx';
import {formatDate, formatLabel} from '../../util/util.js';

function InputUpdateItemComponent({ item, index, projects, onChange, onRemove, canRemove }) {
  const handleChange = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <div className="input-update__item">
      <div className="input-update__item-header">
        <h3>Project {index + 1}</h3>
        {canRemove && (
          <button
            type="button"
            className="input-update__remove"
            onClick={() => onRemove(index)}
          >
            Hapus
          </button>
        )}
      </div>
      <div className="input-update__input-section">
        <GeneralInputComponent
          id={`date-${index}`}
          type="date"
          label="Tanggal"
          value={item.date}
          onChange={(value) => handleChange('date', value)}
        />
        <SearchableSelectComponent
          id={`project-${index}`}
          label="Project"
          placeholder="Cari nama project..."
          options={projects}
          optionsId="nama"
          optionsValue="nama"
          value={item.name}
          onValueChange={(value) => handleChange('name', value)}
        />
        <GeneralInputComponent
          id={`status-${index}`}
          label="Status"
          placeholder="Status Project"
          value={formatLabel(item.status)}
          disabled
          accentValue
        />
        <GeneralInputComponent
          id={`pic-${index}`}
          label="PIC/Owner"
          placeholder="Nama Owner/PIC"
          value={item.pic}
          disabled
        />
        <GeneralInputComponent
          id={`deadline-${index}`}
          type="text"
          label="Tanggal Penyelesaian"
          placeholder="1 Jan 1970"
          value={item.deadline ? formatDate(item.deadline) : ''}
          disabled
        />
        <div className="input-update__wide">
          <GeneralInputComponent
            id={`progress-${index}`}
            label="Progress/Output"
            placeholder="Tuliskan progress atau hasil yang diperoleh hari ini..."
            value={item.progress}
            onChange={(value) => handleChange('progress', value)}
            isHigh
          />
          <GeneralInputComponent
            id={`issue-${index}`}
            label="Kendala/Isu"
            placeholder="Tuliskan kendala yang anda alami hari ini..."
            value={item.issue}
            onChange={(value) => handleChange('issue', value)}
            isHigh
          />
          <GeneralInputComponent
            id={`action-${index}`}
            label="Next Action"
            placeholder="Tuliskan langkah anda selanjutnya..."
            value={item.nextStep}
            onChange={(value) => handleChange('nextStep', value)}
            isHigh
          />
        </div>
      </div>
    </div>
  );
}

export default InputUpdateItemComponent;