import React, { useEffect, useState } from 'react';
import useInput from '../hooks/useInput.js';
import InputUpdateComponent from '../components/UpdatePage/InputUpdateComponent.jsx';
import { FaClock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddUpdate, asyncDeleteUpdate, asyncEditUpdate, asyncGetUpdates } from '../states/updates/action.js';
import UpdateListTable from '../components/UpdatePage/UpdateListTable.jsx';
import UpdatesListModal from '../components/UpdatePage/UpdatesListModal.jsx';
import MessagePreviewComponent from '../components/UpdatePage/MessagePreviewComponent.jsx';
import { formatUpdatedMessage } from '../util/util.js';

function InputUpdatePage({ projects }) {
  const updates = useSelector((states) => states.updates);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [isViewAll, setIsViewAll] = useState(false);

  const [id, setId] = useState('');
  const [date, onDateChange, setDate] = useInput('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [pic, onPicChange, setPic] = useInput('');
  const [progress, onProgressChange, setProgress] = useInput('');
  const [issue, onIssueChange, setIssue] = useInput('');
  const [nextStep, onNextStepChange, setNextStep] = useInput('');
  const [deadline, onDeadlineChange, setDeadline] = useInput('');
  const [documents, setDocuments] = useState([]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(asyncGetUpdates());
  }, [dispatch]);

  const onProjectChange = (projectName) => {
    setName(projectName);

    const selectedProject = projects.find((item) => item.name === projectName);

    if (!selectedProject) return;

    setStatus(selectedProject.status ?? '');
    setPic(selectedProject.owner ?? '');
    setDeadline(selectedProject.targetGoLive ?? '');
  };

  const updateInfo = {
    date, onDateChange, name, onProjectChange, status, setStatus, pic, onPicChange, progress, onProgressChange,
    issue, onIssueChange, nextStep, onNextStepChange, deadline, onDeadlineChange, documents, setDocuments
  };

  const formatInput = {
    id: (id === '' ? null : id),
    date: date,
    name: name,
    status: status,
    pic: pic,
    progress: progress,
    issue: issue,
    nextStep: nextStep,
    deadline: deadline,
    documents: documents
  };

  const onResetInput = () => {
    setIsEdit(false);
    setDate('');
    setName('');
    setStatus('');
    setPic('');
    setProgress('');
    setIssue('');
    setNextStep('');
    setDeadline('');
    setDocuments([]);
  };

  const onCreateUpdate = async () => {
    try {
      await dispatch(asyncAddUpdate(formatInput));
      onResetInput();
    }
    catch (error) {
      console.error('Failed to create update:', error);
    }
  };

  const onPreviewUpdate = (update) => {
    setIsEdit(true);
    setId(update.id);
    setDate(update.date);
    setName(update.name);
    setStatus(update.status);
    setPic(update.pic);
    setProgress(update.progress);
    setIssue(update.issue);
    setNextStep(update.nextStep);
    setDeadline(update.deadline);
    setDocuments(update.documents);

    if (isViewAll) {
      setIsViewAll(false);
    }
  };

  const onDeleteUpdate = (updateId) => {
    dispatch(asyncDeleteUpdate(updateId));
  };

  const onEditUpdate = () => {
    try {
      dispatch(asyncEditUpdate(formatInput));
      onResetInput();
    }
    catch (error) {
      console.error('Failed to edit update:', error);
    }
  };

  const onViewAllHistory = () => {
    setIsViewAll(true);
  };

  const onCloseModal = () => {
    setIsViewAll(false);
  };

  const generateUpdateObject = () => {
    return { date, name, status, pic, progress, issue, nextStep, deadline };
  };

  const onGetMessage = () => {
    setMessage(formatUpdatedMessage(generateUpdateObject()));
  };

  return (
    <section className="input-update">
      <div className="input-update__header">
        <h1>Input Update Progress Project</h1>
        <p>Tambahkan informasi pekerjaan hari ini. Kami akan membantu menjadi format WhatsApp.</p>
      </div>
      <div className="input-update__main">
        <div className="input-update__input-section">
          <InputUpdateComponent
            updateInfo={updateInfo}
            projects={projects}
            isEdit={isEdit}
            onResetInput={onResetInput}
            onCreateUpdate={onCreateUpdate}
            onEditUpdate={onEditUpdate}/>
          <MessagePreviewComponent message={message} onGetMessage={onGetMessage} />
        </div>
        <div className="input-update__history">
          <div className="input-update__history-header">
            <div className="input-update__history-title">
              <FaClock />
              <p>Update History</p>
            </div>
            <p className="input-update__view-history" onClick={onViewAllHistory}>Lihat Semua History</p>
          </div>
          <UpdateListTable
            updates={updates.slice(0, 5)}
            onPreviewUpdate={onPreviewUpdate}
            onDeleteUpdate={onDeleteUpdate}/>
        </div>
        { isViewAll && (
          <UpdatesListModal
            onCloseModal={onCloseModal}
            updates={updates}
            onDeleteUpdate={onDeleteUpdate}
            onPreviewUpdate={onPreviewUpdate}/>
        )}
      </div>
    </section>
  );
}

export default InputUpdatePage;
