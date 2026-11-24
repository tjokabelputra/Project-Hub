import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProjectListComponent from '../components/ProjectPage/sub/ProjectListComponent.jsx';
import ProjectTypeComponent from '../components/ProjectPage/sub/ProjectTypeComponent.jsx';
import ProjectInfoComponent from '../components/ProjectPage/sub/ProjectInfoComponent.jsx';
import useInput from '../hooks/useInput.js';
import ProjectStagesComponent from '../components/ProjectPage/sub/ProjectStagesComponent.jsx';
import ProjectReviewComponent from '../components/ProjectPage/sub/ProjectReviewComponent.jsx';
import documentApi from '../util/documentApi.js';
import { useDispatch, useSelector } from 'react-redux';
import { formatLabel, getIdByName } from '../util/util.js';
import projectApi from '../util/projectApi.js';
import { asyncGetProjects } from '../states/projects/action.js';

function ProjectPage({ onDeleteProject, onAddProject, onSubmitEdit }) {
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [projectType, setType] = useState('');
  const [code, onCodeChange, setCode] = useInput('');
  const [name, onNameChange, setName] = useInput('');
  const [description, onDescChange, setDesc] = useInput('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [pm, setPM] = useState('');
  const [bp, setBP] = useState('');
  const [requestingUnit, setUnit] = useState('');
  const [owner, onOwnerChange, setOwner] = useInput('');
  const [workingUnits, setWorkingUnits] = useState([]);
  const [projectDate, onProjectDateChange, setProjectDate] = useInput('');
  const [targetGoLive, onTargetDateChange, setTargetDate] = useInput('');
  const [stagesHistory, setStagesHistory] = useState([]);
  const [supportingDocuments, setSupportingDocuments] = useState([]);

  const pms = useSelector((states) => states.pms);
  const bps = useSelector((states) => states.bps);
  const units = useSelector((states) => states.units);
  const projectsState = useSelector((states) => states.projects);
  const dispatch = useDispatch();
  const projects = projectsState.data;
  const pagination = projectsState.pagination;

  //Format object for api request body
  const projectFormat = {
    kategori: category.trim().replace(/\s+/g, '_'),
    jenis: projectType.toUpperCase(),
    kodeProject: code,
    nama: name,
    deskripsi: description,
    pmId: getIdByName(pms, pm),
    bpId: getIdByName(bps, bp),
    unitId: getIdByName(units, requestingUnit),
    unitKerjaDeveloper: workingUnits,
    ownerPic: owner,
    tanggalProject: projectDate,
    targetGoLive: targetGoLive,
    prioritas: priority.toUpperCase(),
    status: status.toUpperCase().replace(/\s+/g, '_'),
    stages: stagesHistory.map((item) => ({
      tahap: item.stage.trim().replace(/\s+/g, '_').toUpperCase(),
      ...(item.date && { tanggalRencana: item.date }),
      status: item.status.trim().replace(/\s+/g, '_').toUpperCase(),
      catatan: item.notes || null
    })),
    newDocuments: supportingDocuments.filter(
      (document) => document instanceof File
    )
  };

  useEffect(() => {
    dispatch(asyncGetProjects(1, 10));
  }, [dispatch]);

  //Reset input
  const resetInput = () => {
    setId('');
    setType('');
    setCode('');
    setName('');
    setDesc('');
    setCategory('');
    setStatus('');
    setPriority('');
    setPM('');
    setBP('');
    setUnit('');
    setOwner('');
    setWorkingUnits([]);
    setProjectDate('');
    setTargetDate('');
    setStagesHistory([]);
    setSupportingDocuments([]);
  };

  //Selecting project for edit
  const setProject = (project) => {
    setId(project.id);
    setType(project.jenis);
    setCode(project.kodeProject);
    setName(project.nama);
    setDesc(project.deskripsi);
    setCategory(project.kategori?.replaceAll('_', ' ') || '');
    setStatus(formatLabel(project.status));
    setPriority(formatLabel(project.prioritas));
    setPM(project.pm?.nama);
    setBP(project.bp?.nama);
    setUnit(project.unitPengusul?.nama);
    setOwner(project.ownerPic);
    setWorkingUnits(project.unitKerjaDeveloper);
    setProjectDate(project.tanggalProject?.split('T')[0]);
    setTargetDate(project.targetGoLive?.split('T')[0]);
    setStagesHistory(
      (project.stages || []).map((item) => ({
        id: item.id,
        stage: formatLabel(item.tahap),
        date: item.tanggalRencana?.split('T')[0] || '',
        status: formatLabel(item.status),
        notes: item.catatan || ''
      }))
    );
    setSupportingDocuments(project.documents);
  };

  const onPageChange = (page) => {
    dispatch(asyncGetProjects(page, 10));
  };

  const onBackPressed = () => {
    setPageIndex(0);
    setIsEdit(false);
    resetInput();
  };

  const nextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const prevPage = () => {
    const currPage = pageIndex;
    setPageIndex(pageIndex - 1);

    if (currPage === 2) {
      resetInput();
    }
  };

  const onEditProject = async (projectId) => {
    try {
      const editedProject = await projectApi.getProjectDetail(projectId);

      if (!editedProject) return;

      setProject(editedProject);
      setIsEdit(true);
      setPageIndex(2);
      console.log(editedProject);
    }
    catch (error) {
      alert(error.message || 'Failed to load project detail.');
    }
  };

  const onCodeSelected = (code) => {
    const project = projects.find(
      (project) => String(project.kodeProject) === String(code)
    );

    if (!project) return;

    setCode(project.kodeProject);
    setName(project.nama);
    setDesc(project.deskripsi);
  };

  const projectInfo = {
    code, onCodeChange, onCodeSelected,
    name, onNameChange,
    description, onDescChange,
    category, setCategory,
    status, setStatus,
    priority, setPriority,
    pm, setPM,
    bp, setBP,
    requestingUnit, setUnit,
    owner, onOwnerChange,
    workingUnits, setWorkingUnits,
    projectDate, onProjectDateChange,
    targetGoLive, onTargetDateChange
  };

  const newProject = {
    jenis: projectType,
    kodeProject: code,
    nama: name,
    deskripsi: description,
    kategori: category,
    status,
    prioritas: priority,
    pm,
    bp,
    unitPengusul: requestingUnit,
    ownerPic: owner,
    unitKerjaDeveloper: workingUnits,
    tanggalProject: projectDate,
    targetGoLive: targetGoLive,
    stages: stagesHistory,
    documents: supportingDocuments
  };

  const addNewProject = async () => {
    try {
      await onAddProject(projectFormat);
      setPageIndex(0);
      resetInput();
    }
    catch (error) {
      alert(error.message || 'Failed to add project.');
    }
  };

  const editProject = () => {
    const updatedProject = {
      id: id,
      ...projectFormat
    };
    try {
      onSubmitEdit(updatedProject);
      setPageIndex(0);
      setIsEdit(false);
      resetInput();
    }
    catch (error) {
      alert(error.message || 'Failed to add project.');
    }
  };

  const onDownloadDocument = async (documentId, documentName) => {
    try {
      const fileBlob = await documentApi.downloadDocument(documentId);

      const downloadUrl = window.URL.createObjectURL(fileBlob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = documentName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Failed to download document:', error);
      alert(error.message);
    }
  };

  return (
    <section className="project-page">
      { pageIndex === 0 &&
          (
            <ProjectListComponent
              projects={projects}
              pagination={pagination}
              onPageChange={onPageChange}
              nextPage={nextPage}
              onDeleteProject={onDeleteProject}
              onEditProject={onEditProject}
              onDownloadDocument={onDownloadDocument}/>
          )
      }
      { pageIndex === 1 &&
          (
            <ProjectTypeComponent
              pageIndex={pageIndex}
              type={projectType}
              onTypeChange={setType}
              onBackPressed={onBackPressed}
              nextPage={nextPage}/>
          )
      }
      { (pageIndex === 2 || pageIndex === 3) && (
        <ProjectInfoComponent
          pageIndex={pageIndex}
          type={projectType}
          projects={projects}
          projectId={id}
          onBackPressed={onBackPressed}
          projectInfo={projectInfo}
          onPreviousPage={prevPage}
          onNextPage={nextPage}
          isEdit={isEdit}/>
      )}
      { pageIndex === 4 && (
        <ProjectStagesComponent
          onBackPressed={onBackPressed}
          pageIndex={pageIndex}
          stagesHistory={stagesHistory}
          setStagesHistory={setStagesHistory}
          supportingDocuments={supportingDocuments}
          setSupportingDocuments={setSupportingDocuments}
          onDownloadDocument={onDownloadDocument}
          onPreviousPage={prevPage}
          onNextPage={nextPage}/>
      )}
      { pageIndex === 5 && (
        <ProjectReviewComponent
          onBackPressed={onBackPressed}
          onPreviousPage={prevPage}
          pageIndex={pageIndex}
          newProject={newProject}
          onDownloadDocument={onDownloadDocument}
          isEdit={isEdit}
          onAddProject={addNewProject}
          onSubmitEdit={editProject}/>
      )}
    </section>
  );
}

ProjectPage.propTypes = {
  projects: PropTypes.array.isRequired,
  onDeleteProject: PropTypes.func.isRequired
};

export default ProjectPage;
