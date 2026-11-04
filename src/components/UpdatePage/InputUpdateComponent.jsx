import React, { useRef, useState } from 'react';
import GeneralInputComponent from '../input/GeneralInputComponent.jsx';
import SearchableSelectComponent from '../input/SearchableSelectComponent.jsx';
import DropdownInputComponent from '../input/DropdownInputComponent.jsx';
import { dummyProjectStatus } from '../../data/dummy.js';
import { BiRecycle } from 'react-icons/bi';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { areInputsValid, formatDate } from '../../util/util.js';
import LoadingSpinner from '../LoadingSpinner.jsx';
import { LuCloudUpload } from 'react-icons/lu';
import api from '../../util/api.js';
import DocumentListComponent from '../ProjectPage/DocumentListComponent.jsx';

function InputUpdateComponent({ updateInfo, projects, isEdit, onResetInput, onCreateUpdate, onEditUpdate }) {
  const {
    date, onDateChange, name, onProjectChange, status, setStatus, pic, onPicChange, progress, onProgressChange,
    issue, onIssueChange, nextStep, onNextStepChange, deadline, onDeadlineChange, documents, setDocuments
  } = updateInfo;

  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingObjectKeys, setDeletingObjectKeys] = useState([]);

  const listInputs = [date, name, progress, nextStep];
  const isInputValid = areInputsValid(listInputs);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    event.target.value = '';
    setIsUploading(true);

    try {
      const uploadedDocument = await api.uploadDocuments(selectedFile);

      setDocuments((prev) => [
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
    setDeletingObjectKeys((prev) => [...prev, objectKey]);

    try {
      await api.deleteDocument(objectKey);

      setDocuments((prev) =>
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

  return (
    <div className="input-update">
      <div className="input-update__layout">
        <div className="input-update__input-section">
          <GeneralInputComponent
            id="date"
            type="date"
            label="Tanggal"
            placeholder=""
            value={date}
            onChange={onDateChange} />
          <SearchableSelectComponent
            id="project"
            label="Project"
            placeholder="Cari nama project..."
            options={projects}
            optionsId = 'id'
            optionsValue = 'name'
            value={name}
            onValueChange={onProjectChange} />
          <DropdownInputComponent
            options={dummyProjectStatus}
            value={status}
            onValueChange={setStatus}
            id="status"
            label="Status"
            placeholder="Status"
            disabled={true}
            accentValue={true} />
          <GeneralInputComponent
            id="owner"
            label="PIC/Owner"
            placeholder="Masukan nama Owner/PIC"
            value={pic}
            onChange={onPicChange}
            disabled={true} />
          <GeneralInputComponent
            id="finish"
            type="text"
            label="Tanggal Penyelesaian"
            placeholder=""
            value={deadline ? formatDate(deadline) : ''}
            onChange={onDeadlineChange}
            disabled={true} />
          <div className="input-update__wide">
            <GeneralInputComponent
              id="progress"
              label="Progress/Output"
              placeholder="Tuliskan progress atau hasil yang diperoleh hari ini..."
              value={progress}
              onChange={onProgressChange}
              isHigh={true} />
            <GeneralInputComponent
              id="issue"
              label="Kendala/Isu"
              placeholder="Tuliskan kendala yang anda alami hari ini..."
              value={issue}
              onChange={onIssueChange}
              isHigh={true}/>
            <GeneralInputComponent
              id="action"
              label="Next Action"
              placeholder="Tuliskan langkah anda selanjutnya..."
              value={nextStep}
              onChange={onNextStepChange}
              isHigh={true} />
            <div className="input-update__docs">
              <p>Documents</p>
              <DocumentListComponent
                supportingDocuments={documents}
                isDelete={true}
                onDeleteDocuments={handleDeleteDocument}
                deletingObjectKeys={deletingObjectKeys}/>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.xlsx"
                hidden
                disabled={isUploading}
                onChange={handleFileChange}
              />

              <div
                className="input-update__upload-doc"
                onClick={!isUploading ? handleUploadClick : undefined}
                role="button"
                tabIndex={0}>
                {isUploading ? (
                  <>
                    <LoadingSpinner size={28} />
                    <p>Mengupload dokumen...</p>
                  </>
                ) : (
                  <>
                    <div className="input-update__upload-icon">
                      <LuCloudUpload />
                    </div>
                    <div className="input-update__upload-info">
                      <p>Klik untuk upload</p>
                      <p>Format: PDF, DOC, XLSX</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="input-update__action">
          <button
            type="button"
            className="input-update__reset"
            onClick={onResetInput}><BiRecycle/> Reset</button>
          <button
            type="button"
            className={`input-update__create ${!isInputValid ? 'input-update__create-disable' : ''}`}
            onClick={isEdit ? onEditUpdate : onCreateUpdate}
            disabled={!isInputValid}
          >
            {isEdit ? <FaEdit /> : <FaPlus />}
            {isEdit ? ' Edit Update' : ' Generate Update'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputUpdateComponent;
