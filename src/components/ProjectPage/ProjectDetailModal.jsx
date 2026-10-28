import React from 'react';
import PropTypes from 'prop-types';
import { FaXmark } from 'react-icons/fa6';
import ProjectInformationComponent from './ProjectInformationComponent.jsx';
import ProjectStagesTable from './ProjectStagesTable.jsx';
import DocumentListComponent from './DocumentListComponent.jsx';

function ProjectDetailModal({ project, onClose }) {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
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
            preCommittee={project.preCommittee}
            committeeTIB={project.committeeTIB}
            committeeTIA={project.committeeTIA}/>
        </div>
        <div className="project-detail-modal__documents">
          <p className="project-detail-modal__label">Dokumen Project</p>
          <DocumentListComponent supportingDocuments={project.supportingDocuments} />
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
