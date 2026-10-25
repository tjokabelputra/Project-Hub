import React from 'react';
import PropTypes from 'prop-types';
import { FaFile, FaTrash } from 'react-icons/fa';
import { MdDownload } from 'react-icons/md';
import { formatFileSize } from '../../util/util.js';

function DocumentListComponent({ supportingDocuments, actionable = true, isDelete = false, onDeleteDocuments = () => {} }) {
  return (
    <div className="document-list">
      { supportingDocuments.map((document) => (
        <div
          key={document.id}
          className="document-list__item">
          <div className="document-list__item-main">
            <div className="document-list__item-icon">
              <FaFile />
            </div>
            <div className="document-list__item-info">
              <p>{document.name}</p>
              <p>{formatFileSize(document.size)}</p>
            </div>
          </div>
          {actionable && (
            isDelete ? (
              <FaTrash
                className="document-list__delete"
                onClick={() => onDeleteDocuments(document.id)}
              />
            ) : (
              <MdDownload className="document-list__download" />
            )
          )}
        </div>
      ))}
    </div>
  );
}

DocumentListComponent.propTypes = {
  supportingDocuments: PropTypes.array
};

export default DocumentListComponent;