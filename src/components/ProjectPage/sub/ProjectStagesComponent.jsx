import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ProjectInputHeaderComponent from '../ProjectInputHeaderComponent.jsx';
import PageIndicatorComponent from '../PageIndicatorComponent.jsx';
import StagesInputComponent from '../StagesInputComponent.jsx';
import DocumentListComponent from '../DocumentListComponent.jsx';
import { LuCloudUpload } from 'react-icons/lu';
import PageFooterComponent from '../PageFooterComponent.jsx';

function ProjectStagesComponent({ onBackPressed, pageIndex, projectStatusDocs, onPreviousPage, onNextPage }) {
  const {
    preCommitteeDate, onPreCommitteeDateChange, preCommitteeStatus, setPreCommitteeStatus, preCommitteeNote, onPreCommitteeNoteChange,
    committeeBDate, onCommitteeBDateChange, committeeBStatus, setCommitteeBStatus, committeeBNote, onCommitteeBNoteChange,
    committeeADate, onCommitteeADateChange, committeeAStatus, setCommitteeAStatus, committeeANote, onCommitteeANoteChange,
    supportingDocuments, setSupportingDocuments
  } = projectStatusDocs;

  const listInputs = [preCommitteeDate, preCommitteeStatus, preCommitteeNote,
    committeeBDate, committeeBStatus, committeeBNote,
    committeeADate, committeeAStatus, committeeANote];

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const newDocument = {
      id: `COD-${+new Date()}`,
      name: selectedFile.name,
      size: selectedFile.size
    };

    setSupportingDocuments((prev) => [
      ...prev,
      newDocument
    ]);

    event.target.value = '';
  };

  const handleDeleteDocument = (id) => {
    setSupportingDocuments((prev) =>
      prev.filter((document) => document.id !== id)
    );
  };

  return (
    <div className="project-input-layout__second">
      <ProjectInputHeaderComponent onBackPressed={onBackPressed} />
      <div className="project-stages__main">
        <PageIndicatorComponent currentPage={pageIndex} />
        <div className="project-stages__input-layout">
          <div className="project-stages__input-section">
            <div className="project-stages__input-stages">
              <p>Informasi Tahapan</p>
              <div className="project-stages__stages">
                <StagesInputComponent
                  id="pre-committee"
                  stage="Pra Komite"
                  date={preCommitteeDate}
                  onDateChange={onPreCommitteeDateChange}
                  status={preCommitteeStatus}
                  onStatusChange={setPreCommitteeStatus}
                  note={preCommitteeNote}
                  onNoteChange={onPreCommitteeNoteChange} />
                <StagesInputComponent
                  id="committee-ti-b"
                  stage="Komite TI B"
                  date={committeeBDate}
                  onDateChange={onCommitteeBDateChange}
                  status={committeeBStatus}
                  onStatusChange={setCommitteeBStatus}
                  note={committeeBNote}
                  onNoteChange={onCommitteeBNoteChange}/>
                <StagesInputComponent
                  id="committee-ti-a"
                  stage="Komite TI A"
                  date={committeeADate}
                  onDateChange={onCommitteeADateChange}
                  status={committeeAStatus}
                  onStatusChange={setCommitteeAStatus}
                  note={committeeANote}
                  onNoteChange={onCommitteeANoteChange}/>
              </div>
            </div>
            <div className="project-stages__input-documents">
              <p>Upload Dokumen Pendukung (Opsional)</p>
              <div className="project-stages__preview-doc">
                <DocumentListComponent
                  supportingDocuments={supportingDocuments}
                  isDelete={true}
                  onDeleteDocuments={handleDeleteDocument}/>
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.xlsx,.jpg,.jpeg,.png"
                  hidden
                  onChange={handleFileChange}/>
                <div
                  className="project-stages__upload-doc"
                  onClick={handleUploadClick}
                  role="button"
                  tabIndex={0}>
                  <div className="project-stages__upload-icon">
                    <LuCloudUpload />
                  </div>
                  <div className="project-stages__upload-info">
                    <p>Klik untuk upload</p>
                    <p>Format: PDF, DOC, XLSX, JPG, PNG</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PageFooterComponent
          listInputs={listInputs}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage} />
      </div>
    </div>
  );
}

ProjectStagesComponent.propTypes = {
  onBackPressed: PropTypes.func.isRequired,
  pageIndex: PropTypes.number.isRequired,
  projectStatusDocs: PropTypes.object.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
};

export default ProjectStagesComponent;