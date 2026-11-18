import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaXmark } from 'react-icons/fa6';
import ProjectInformationComponent from './ProjectInformationComponent.jsx';
import DocumentListComponent from './DocumentListComponent.jsx';
import projectApi from '../../util/projectApi.js';
import CommitteeList from './CommitteeList.jsx';
import UpdateHistory from './UpdateHistory.jsx';

function ProjectDetailModal({ project, onClose, onDownloadDocument }) {
  const [selectedProject, setSelectedProject] = useState({});

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!project?.id) return;

    const getProjectDetail = async () => {
      try {
        const result = await projectApi.getProjectDetail(project.id);
        setSelectedProject(result);
      }
      catch (error) {
        console.error('Gagal mengambil detail project:', error);
      }
    };

    getProjectDetail();
  }, [project?.id]);

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
          <ProjectInformationComponent project={selectedProject}/>
        </div>
        <div className="project-detail-modal__stages">
          <p className="project-detail-modal__label">Tahapan Project</p>
          <CommitteeList stages={selectedProject.stages}/>
        </div>
        <div className="project-detail-modal__history">
          <p className="project-detail-modal__label">Histori Perubahan</p>
          <UpdateHistory history={selectedProject.stageHistory}/>
        </div>
        <div className="project-detail-modal__documents">
          <p className="project-detail-modal__label">Dokumen Project</p>
          <DocumentListComponent
            supportingDocuments={selectedProject.documents}
            onDownload={onDownloadDocument} />
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
