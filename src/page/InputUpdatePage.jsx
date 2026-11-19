import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputUpdateComponent from '../components/UpdatePage/InputUpdateComponent.jsx';
import UpdateListTable from '../components/UpdatePage/UpdateListTable.jsx';
import MessagePreviewComponent from '../components/UpdatePage/MessagePreviewComponent.jsx';
import DropdownInputComponent from '../components/input/DropdownInputComponent.jsx';
import { asyncGetUpdates } from '../states/updates/action.js';
import updateApi from '../util/updateApi.js';

function getTodayDate() {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');
}

function createEmptyItem() {
  return {
    key: crypto.randomUUID(),
    date: getTodayDate(),
    name: '',
    status: '',
    pic: '',
    progress: '',
    issue: '',
    nextStep: '',
    deadline: ''
  };
}

function InputUpdatePage({ projects = [] }) {
  const updates = useSelector((states) => states.updates);
  const dispatch = useDispatch();

  const [historyProjectId, setHistoryProjectId] = useState('');
  const [items, setItems] = useState(() => [createEmptyItem()]);
  const [message, setMessage] = useState('');

  const projectOptions = projects
    .filter((project) => project.status !== 'SELESAI')
    .map((project) => ({
      id: project.id,
      value: `${project.nama} (${project.kodeProject || '-'})`
    }));

  useEffect(() => {
    const getUpdate = () => {
      if (historyProjectId || projectOptions.length === 0) return;

      const firstProject = projectOptions[0];

      setHistoryProjectId(firstProject.id);
      dispatch(asyncGetUpdates(firstProject.id));
    };

    getUpdate();
  }, [dispatch, projects, historyProjectId, projectOptions]);

  const onHistoryProjectChange = (projectLabel) => {
    const selectedProject = projects.find(
      (project) =>
        `${project.nama} (${project.kodeProject || '-'})` === projectLabel
    );

    if (!selectedProject) return;

    setHistoryProjectId(selectedProject.id);
    dispatch(asyncGetUpdates(selectedProject.id));
  };

  const onAddItem = () => {
    if (items.length >= 10) return;

    setItems((prev) => [...prev, createEmptyItem()]);
  };

  const onRemoveItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const onChangeItem = (index, field, event) => {
    const value = event?.target ? event.target.value : event;

    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;

        if (field === 'name') {
          const selectedProject = projects.find(
            (project) => project.nama === value
          );

          return {
            ...item,
            name: value,
            status: selectedProject?.status || '',
            pic: selectedProject?.ownerPic || '',
            deadline: selectedProject?.targetGoLive?.split('T')[0] || ''
          };
        }

        return {
          ...item,
          [field]: value
        };
      })
    );
  };

  const onResetInput = () => {
    setItems([createEmptyItem()]);
    setMessage('');
  };

  const getUpdatePayloads = () => {
    const payloads = items.map((item) => {
      const selectedProject = projects.find(
        (project) => project.nama === item.name
      );

      if (!selectedProject) {
        throw new Error(`Project ${item.name || ''} tidak ditemukan.`);
      }

      return {
        projectId: selectedProject.id,
        status: item.status || undefined,
        aktivitas: item.progress || null,
        kendala: item.issue || null,
        nextAction: item.nextStep || null
      };
    });

    const projectIds = payloads.map((item) => item.projectId);

    if (new Set(projectIds).size !== projectIds.length) {
      throw new Error('Project yang dipilih tidak boleh duplikat.');
    }

    return payloads;
  };

  const onGetMessage = async () => {
    try {
      const payloads = getUpdatePayloads();
      const previewText = await updateApi.previewUpdate(payloads);
      setMessage(previewText);
    }
    catch (error) {
      alert(error.message);
    }
  };

  const onCreateUpdate = async () => {
    try {
      const payloads = getUpdatePayloads();
      await updateApi.addUpdate(payloads);
      onResetInput();

      if (historyProjectId) {
        dispatch(asyncGetUpdates(historyProjectId));
      }
    }
    catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="input-update">
      <div className="input-update__header">
        <h1>Input Update Progress Project</h1>
        <p>
            Tambahkan informasi pekerjaan hari ini. Kami akan membantu
            menjadi format WhatsApp.
        </p>
      </div>
      <div className="input-update__main">
        <div className="input-update__input-section">
          <InputUpdateComponent
            items={items}
            projects={projects}
            onChangeItem={onChangeItem}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            onResetInput={onResetInput}
            onCreateUpdate={onCreateUpdate}
            isPreview={false} />
          <MessagePreviewComponent
            message={message}
            onGetMessage={onGetMessage} />
        </div>
        <div className="input-update__history">
          <div className="input-update__history-header">
            <div className="input-update__history-title">
              <p>Update History</p>
            </div>
            <div className="input-update__project-select">
              <DropdownInputComponent
                options={projectOptions}
                value={
                  projectOptions.find(
                    (option) => option.id === historyProjectId
                  )?.value || ''
                }
                onValueChange={onHistoryProjectChange}
                id="history-project"
                placeholder="Pilih project..." />
            </div>
          </div>
          <UpdateListTable updates={updates} />
        </div>
      </div>
    </section>
  );
}

export default InputUpdatePage;
