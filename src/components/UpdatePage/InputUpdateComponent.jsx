import React from 'react';
import { BiRecycle } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';

import InputUpdateItemComponent from './InputUpdateItemComponent.jsx';
import { areInputsValid } from '../../util/util.js';

function InputUpdateComponent({ items, projects, onChangeItem, onAddItem, onRemoveItem, onResetInput, onCreateUpdate, isPreview }) {
  const isInputValid =
      items.length > 0 &&
      items.every((item) =>
        areInputsValid([
          item.date,
          item.name,
          item.progress,
          item.nextStep
        ])
      );

  return (
    <div className="input-update">
      <div className="input-update__layout">
        <div className="input-update__items">
          {items.map((item, index) => (
            <InputUpdateItemComponent
              key={item.key}
              item={item}
              index={index}
              projects={projects}
              onChange={onChangeItem}
              onRemove={onRemoveItem}
              canRemove={items.length > 1}
            />
          ))}
        </div>
        <div className="input-update__action">
          <button
            type="button"
            className="input-update__add"
            onClick={onAddItem}
            disabled={items.length >= 10} >
            <FaPlus /> Tambah Project
          </button>
          <div className="input-update__action-other">
            <button
              type="button"
              className="input-update__reset"
              onClick={onResetInput} >
              <BiRecycle /> Reset
            </button>
            {!isPreview && (
              <button
                type="button"
                className={`input-update__create ${
                  !isInputValid ? 'input-update__create-disable' : ''
                }`}
                onClick={onCreateUpdate}
                disabled={!isInputValid} >
                <FaPlus /> Generate Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputUpdateComponent;
