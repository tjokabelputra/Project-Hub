import React, { useState } from 'react';
import useInput from '../hooks/useInput.js';
import InputUpdateComponent from '../components/UpdatePage/InputUpdateComponent.jsx';

function InputUpdatePage({ projects }) {
  const [date, onDateChange, setDate] = useInput('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState('');
  const [owner, onOwnerChange, setOwner] = useInput('');
  const [activity, onActivityChange, setActivity] = useInput('');
  const [progress, onProgressChange, setProgress] = useInput('');
  const [issue, onIssueChange, setIssue] = useInput('');
  const [action, onActionChange, setAction] = useInput('');
  const [finishDate, onFinishDateChange, setFinishDate] = useInput('');

  const updateInfo = {
    date, onDateChange, project, setProject, status, setStatus, owner, onOwnerChange, activity, onActivityChange,
    progress, onProgressChange, issue, onIssueChange, action, onActionChange, finishDate, onFinishDateChange
  };

  const onResetInput = () => {
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
            onResetInput={onResetInput}
            onCreateUpdate={() => {}} />
        </div>
        <div className="input-update__history">

        </div>
      </div>
    </section>
  );
}

export default InputUpdatePage;