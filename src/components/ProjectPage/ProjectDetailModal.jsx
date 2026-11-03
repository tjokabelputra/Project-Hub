import React from 'react';
import PropTypes from 'prop-types';
import { FaXmark } from 'react-icons/fa6';
import ProjectInformationComponent from './ProjectInformationComponent.jsx';
import ProjectStagesTable from './ProjectStagesTable.jsx';
import DocumentListComponent from './DocumentListComponent.jsx';
import api from '../../util/api.js';

function ProjectDetailModal({ project, onClose }) {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const downloadDocument = async (documentId) => {
    try {
      const downloadUrl = await api.getDocument(documentId);

      const link = window.document.createElement('a');
      link.href = downloadUrl;

      link.setAttribute('download', '');

      window.document.body.appendChild(link);
      link.click();
      link.remove();
    }
    catch (error) {
      console.error('Failed to download document:', error);
      alert(error.message);
    }
  };

  return (
    <div
      className="project-detail-modal-layout"
      onClick={handleBackdropClick}>
      <div className="project-detail-modal">
        <div className="project-detail-modal__header">
          <h1>Project Detail</h1>
          <div
            className="project-detail-modal__exit"
            onClick={onClose}>
            <FaXmark/>
          </div>
        </div>
        <div className="project-detail-modal__info">
          <p className="project-detail-modal__label">Informasi Project</p>
          <ProjectInformationComponent project={project}/>
        </div>
        <div className="project-detail-modal__stages">
          <p className="project-detail-modal__label">Tahapan Project</p>
          <ProjectStagesTable
            stageHistory={project.stagesHistory}/>
        </div>
        <div className="project-detail-modal__documents">
          <p className="project-detail-modal__label">Dokumen Project</p>
          <DocumentListComponent
            supportingDocuments={project.supportingDocuments}
            onDownload={downloadDocument} />
        </div>
      </div>
    </div>
  );
}

ProjectDetailModal.propTypes = {
  project: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ProjectDetailModal;
