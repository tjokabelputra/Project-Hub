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
import documentApi from "../../../util/documentApi.js";

function ProjectStagesComponent({ onBackPressed, pageIndex, stagesHistory, setStagesHistory, supportingDocuments, setSupportingDocuments, onDownloadDocument, onPreviousPage, onNextPage }) {
  const fileInputRef = useRef(null);
  const [editingStageIndex, setEditingStageIndex] = useState(null);
  const [deletingObjectKeys, setDeletingObjectKeys] = useState([]);
  const [stage, setStage] = useState('');
  const [date, onDateChange, setDate] = useInput('');
  const [status, setStatus] = useState('');
  const [notes, onNoteChange, setNotes] = useInput('');

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleAddStages = () => {
    const updatedStage = {
      ...(editingStageIndex !== null
        ? stagesHistory[editingStageIndex]
        : {}),
      stage,
      date,
      status,
      notes
    };

    if (editingStageIndex !== null) {
      setStagesHistory((prev) =>
        prev.map((item, index) =>
          index === editingStageIndex ? updatedStage : item
        )
      );
    }
    else {
      setStagesHistory((prev) => [...prev, updatedStage]);
    }

    setStage('');
    setDate('');
    setStatus('');
    setNotes('');
    setEditingStageIndex(null);
  };

  const handleEditStage = (index) => {
    const selectedStage = stagesHistory[index];

    setStage(selectedStage.stage);
    setDate(selectedStage.date || '');
    setStatus(selectedStage.status);
    setNotes(selectedStage.notes || '');

    setEditingStageIndex(index);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (!selectedFiles.length) return;

    setSupportingDocuments((prev) => [
      ...prev,
      ...selectedFiles
    ]);

    event.target.value = '';
  };

  const handleDeleteDocument = async (document) => {
    if (!document) return;

    if (document instanceof File) {
      setSupportingDocuments((prev) =>
        prev.filter((item) => item !== document)
      );
      return;
    }

    if (!document.id) {
      console.error('Document ID tidak ditemukan:', document);
      return;
    }

    setDeletingObjectKeys((prev) => [...prev, document.id]);

    try {
      await documentApi.deleteDocument(document.id);

      setSupportingDocuments((prev) =>
        prev.filter((item) => item.id !== document.id)
      );
    }
    catch (error) {
      console.error(error);
      alert(`Gagal menghapus: ${error.message}`);
    }
    finally {
      setDeletingObjectKeys((prev) =>
        prev.filter((id) => id !== document.id)
      );
    }
  };

  const handleDeleteStage = (index) => {
    setStagesHistory((prev) =>
      prev.filter((_, i) => i !== index)
    );

    if (editingStageIndex === index) {
      setEditingStageIndex(null);
      setStage('');
      setDate('');
      setStatus('');
      setNotes('');
    }
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
                onDeleteStage={handleDeleteStage}
                onEditStage={handleEditStage}
              />
            </div>
            <div className="project-stages__input-documents">
              <p>Upload Dokumen Pendukung (Opsional)</p>
              <div className="project-stages__preview-doc">
                <DocumentListComponent
                  supportingDocuments={supportingDocuments}
                  isDelete={true}
                  onDownload={onDownloadDocument}
                  onDeleteDocuments={handleDeleteDocument}
                  deletingObjectKeys={deletingObjectKeys}/>
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.xlsx"
                  hidden
                  onChange={handleFileChange}
                />

                <div
                  className="project-stages__upload-doc"
                  onClick={handleUploadClick}
                  role="button"
                  tabIndex={0}
                >
                  <>
                    <div className="project-stages__upload-icon">
                      <LuCloudUpload />
                    </div>
                    <div className="project-stages__upload-info">
                      <p>Klik untuk upload</p>
                      <p>Format: PDF, DOC, XLSX</p>
                    </div>
                  </>
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
