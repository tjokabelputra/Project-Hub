import React from 'react';
import PropTypes from 'prop-types';
import ProjectInputHeaderComponent from '../ProjectInputHeaderComponent.jsx';
import PageIndicatorComponent from '../PageIndicatorComponent.jsx';
import ProjectInformationComponent from '../ProjectInformationComponent.jsx';
import ProjectStagesTable from '../ProjectStagesTable.jsx';
import DocumentListComponent from '../DocumentListComponent.jsx';
import PageFooterComponent from '../PageFooterComponent.jsx';

function ProjectReviewComponent({ onBackPressed, onPreviousPage, pageIndex, newProject, isEdit, onAddProject, onSubmitEdit, onDownloadDocument }) {
  return (
    <div className="project-input-layout__second">
      <ProjectInputHeaderComponent onBackPressed={onBackPressed} />
      <div className="project-review__main">
        <PageIndicatorComponent currentPage={pageIndex} />
        <div className="project-review__review-layout">
          <div className="project-review__review-section">
            <div className="project-review__project-data">
              <p>Data Project</p>
              <ProjectInformationComponent project={newProject} />
            </div>
            <div className="project-review__project-steps">
              <p>Tahapan Project</p>
              <ProjectStagesTable
                stageHistory={newProject.stagesHistory}/>
            </div>
            <div className="project-review__project-docs">
              <p>Dokumen Pendukung</p>
              <DocumentListComponent
                actionable={false}
                supportingDocuments={newProject.supportingDocuments}
                onDownload={onDownloadDocument}/>
            </div>
          </div>
        </div>
        <PageFooterComponent
          onPreviousPage={onPreviousPage}
          onNextPage={isEdit ? onSubmitEdit : onAddProject}
          isLastPage={true}/>
      </div>
    </div>
  );
}

ProjectReviewComponent.propTypes = {
  onBackPressed: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  pageIndex: PropTypes.number.isRequired,
  newProject: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  onAddProject: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
};

export default ProjectReviewComponent;
