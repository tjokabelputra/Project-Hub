import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../util/api.js';
import ProjectInputHeaderComponent from '../ProjectInputHeaderComponent.jsx';
import PageIndicatorComponent from '../PageIndicatorComponent.jsx';
import StagesInputComponent from '../StagesInputComponent.jsx';
import DocumentListComponent from '../DocumentListComponent.jsx';
import { LuCloudUpload } from 'react-icons/lu';
import PageFooterComponent from '../PageFooterComponent.jsx';
import ProjectStagesTable from '../ProjectStagesTable.jsx';
import useInput from '../../../hooks/useInput.js';
import LoadingSpinner from '../../LoadingSpinner.jsx';

function ProjectStagesComponent({ onBackPressed, pageIndex, stagesHistory, setStagesHistory, supportingDocuments, setSupportingDocuments, onPreviousPage, onNextPage }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingObjectKeys, setDeletingObjectKeys] = useState([]);
  const [stage, setStage] = useState('');
  const [date, onDateChange, setDate] = useInput('');
  const [status, setStatus] = useState('');
  const [notes, onNoteChange, setNotes] = useInput('');

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleAddStages = () => {
    const newStages = {
      stage: stage,
      date: date,
      status: status,
      notes: notes
    };

    setStagesHistory((prev) => [
      ...prev,
      newStages
    ]);

    setStage('');
    setDate('');
    setStatus('');
    setNotes('');
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    event.target.value = '';
    setIsUploading(true);

    try {
      const uploadedDocument = await api.uploadDocuments(selectedFile);

      setSupportingDocuments((prev) => [
        ...prev,
        {
          name: uploadedDocument.name,
          size: uploadedDocument.size,
          objectKey: uploadedDocument.objectKey,
          contentType: uploadedDocument.contentType
        }
      ]);
    }
    catch (error) {
      console.error(error);
      alert(`Gagal mengupload ${selectedFile.name}: ${error.message}`);
    }
    finally {
      setIsUploading(false);
    }
  };

  const handleDeleteDocument = async (objectKey) => {
    console.log(objectKey)
    try {
      await api.deleteDocument(objectKey);
      setSupportingDocuments((prev) =>
        prev.filter((document) => document.objectKey !== objectKey)
      );
    }
    catch (error) {
      console.error(error);
      alert(`Gagal menghapus: ${error.message}`);
    }
    finally {
      setDeletingObjectKeys((prev) =>
        prev.filter((key) => key !== objectKey)
      );
    }
  };

  const handleDeleteStage = (id) => {
    setStagesHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="project-input-layout__first">
      <ProjectInputHeaderComponent onBackPressed={onBackPressed} />
      <div className="project-stages__main">
        <PageIndicatorComponent currentPage={pageIndex} />
        <div className="project-stages__input-layout">
          <div className="project-stages__input-section">
            <div className="project-stages__input-stages">
              <p>Informasi Tahapan</p>
              <StagesInputComponent
                stage={stage}
                onStageChange={setStage}
                date={date}
                onDateChange={onDateChange}
                status={status}
                onStatusChange={setStatus}
                notes={notes}
                onNoteChange={onNoteChange}
                onAddStage={handleAddStages}/>
              <ProjectStagesTable
                stageHistory={stagesHistory}
                isDeletable={true}
                onDeleteStage={handleDeleteStage} />
            </div>
            <div className="project-stages__input-documents">
              <p>Upload Dokumen Pendukung (Opsional)</p>
              <div className="project-stages__preview-doc">
                <DocumentListComponent
                  supportingDocuments={supportingDocuments}
                  isDelete={true}
                  onDeleteDocuments={handleDeleteDocument}
                  deletingObjectKeys={deletingObjectKeys}/>
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.xlsx"
                  hidden
                  disabled={isUploading}
                  onChange={handleFileChange}
                />

                <div
                  className="project-stages__upload-doc"
                  onClick={!isUploading ? handleUploadClick : undefined}
                  role="button"
                  tabIndex={0}
                >
                  {isUploading ? (
                    <>
                      <LoadingSpinner size={28} />
                      <p>Mengupload dokumen...</p>
                    </>
                  ) : (
                    <>
                      <div className="project-stages__upload-icon">
                        <LuCloudUpload />
                      </div>
                      <div className="project-stages__upload-info">
                        <p>Klik untuk upload</p>
                        <p>Format: PDF, DOC, XLSX</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <PageFooterComponent
          listInputs={stagesHistory}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage} />
      </div>
    </div>
  );
}

ProjectStagesComponent.propTypes = {
  onBackPressed: PropTypes.func.isRequired,
  pageIndex: PropTypes.number.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
};

export default ProjectStagesComponent;
