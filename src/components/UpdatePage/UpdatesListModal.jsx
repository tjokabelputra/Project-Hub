import React, { useState } from 'react';
import { FaHistory, FaTimes } from 'react-icons/fa';
import UpdateListTable from './UpdateListTable.jsx';
import PaginationComponent from '../PaginationComponent.jsx';

function UpdatesListModal({ onCloseModal, updates, onPreviewUpdate, onDeleteUpdate }) {
  const [currentPage, setCurrentPage] = useState(1);

  const tableSize = 10;
  const startIndex = (currentPage - 1) * tableSize;
  const endIndex = startIndex + tableSize;
  const paginatedUpdates = updates.slice(startIndex, endIndex);

  return (
    <div className="updates-list-modal-layout">
      <div className="updates-list-modal">
        <div className="updates-list-modal__header">
          <div>
            <FaHistory />
            <h1>Semua History Update</h1>
          </div>
          <FaTimes onClick={onCloseModal}/>
        </div>
        <div className="updates-list-modal__table">
          <UpdateListTable
            updates={paginatedUpdates}
            onPreviewUpdate={onPreviewUpdate}
            onDeleteUpdate={onDeleteUpdate}
          />
        </div>
        <PaginationComponent
          filteredDataLength={updates.length}
          tableSize={tableSize}
          startIndex={startIndex}
          endIndex={endIndex}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}/>
      </div>
    </div>
  );
}

export default UpdatesListModal;