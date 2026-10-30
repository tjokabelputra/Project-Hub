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
  const [project, setProject] = useState('');
  const [status, setStatus] = useState('');
  const [owner, onOwnerChange, setOwner] = useInput('');
  const [activity, onActivityChange, setActivity] = useInput('');
  const [progress, onProgressChange, setProgress] = useInput('');
  const [issue, onIssueChange, setIssue] = useInput('');
  const [action, onActionChange, setAction] = useInput('');
  const [finishDate, onFinishDateChange, setFinishDate] = useInput('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(asyncGetUpdates());
  }, [dispatch]);

  const onProjectChange = (projectName) => {
    setProject(projectName);

    const selectedProject = projects.find((item) => item.name === projectName);

    if (!selectedProject) return;

    setStatus(selectedProject.status ?? '');
    setOwner(selectedProject.owner ?? '');
    setFinishDate(selectedProject.targetGoLive ?? '');
  };

  const updateInfo = {
    date, onDateChange, project, onProjectChange, status, setStatus, owner, onOwnerChange, activity, onActivityChange,
    progress, onProgressChange, issue, onIssueChange, action, onActionChange, finishDate, onFinishDateChange
  };

  const formatInput = {
    id: (id === '' ? `update-${+new Date()}` : id),
    date: date,
    project: project,
    status: status,
    pic: (owner !== '' ? owner : null),
    activity: activity,
    progress: progress,
    issue: issue,
    nextStep: action,
    deadline: (finishDate !== '' ? finishDate : null),
  };

  const onResetInput = () => {
    setIsEdit(false);
    setDate('');
    setProject('');
    setStatus('');
    setOwner('');
    setActivity('');
    setProgress('');
    setIssue('');
    setAction('');
    setFinishDate('');
  };

  const onCreateUpdate = () => {
    dispatch(asyncAddUpdate(formatInput));
    onResetInput();
  };

  const onPreviewUpdate = (update) => {
    setIsEdit(true);
    setId(update.id);
    setDate(update.date);
    setProject(update.project);
    setStatus(update.status);
    setOwner(update.pic ?? '');
    setActivity(update.activity);
    setProgress(update.progress);
    setIssue(update.issue);
    setAction(update.nextStep);
    setFinishDate(update.deadline ?? '');

    if (isViewAll) {
      setIsViewAll(false);
    }
  };

  const onDeleteUpdate = (updateId) => {
    dispatch(asyncDeleteUpdate(updateId));
  };

  const onEditUpdate = () => {
    dispatch(asyncEditUpdate(formatInput));
    onResetInput();
  };

  const onViewAllHistory = () => {
    setIsViewAll(true);
  };

  const onCloseModal = () => {
    setIsViewAll(false);
  };

  const generateUpdateObject = () => {
    return { date, project, status, owner, activity, progress, issue, action, finishDate };
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
