import React from 'react';
import PropTypes from 'prop-types';
import { FaFile, FaTrash } from 'react-icons/fa';
import { formatFileSize } from '../../util/util.js';
import LoadingSpinner from '../LoadingSpinner.jsx';

function DocumentListComponent({ supportingDocuments = [], actionable = true, isDelete = false, onDeleteDocuments, onDownload, deletingObjectKeys = [] }) {
  return (
    <div className="document-list">
      {supportingDocuments.map((document) => {
        const isDeleting = deletingObjectKeys.includes(document.id || document.name);
        return (
          <div
            key={document.id}
            className="document-list__item"
          >
            <div className="document-list__item-main">
              <div className="document-list__item-icon">
                <FaFile />
              </div>
              <div className="document-list__item-info">
                <p
                  className="document-list__file-name"
                  onClick={() => onDownload(document.id, document.namaFile)}
                  title="Klik untuk download"
                >
                  {document.namaFile || document.name}
                </p>
                <p>{formatFileSize(document.ukuran ?? document.size)}</p>
              </div>
            </div>

            {actionable && isDelete && (
              isDeleting ? (
                <LoadingSpinner size={16} />
              ) : (
                <FaTrash
                  className="document-list__delete"
                  onClick={() => onDeleteDocuments(document)}
                />
              )
            )}
          </div>
        );
      })}
    </div>
  );
}

DocumentListComponent.propTypes = {
  supportingDocuments: PropTypes.array,
  actionable: PropTypes.bool,
  isDelete: PropTypes.bool,
  onDeleteDocuments: PropTypes.func,
};

export default DocumentListComponent;