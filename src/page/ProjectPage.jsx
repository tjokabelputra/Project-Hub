import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectListComponent from '../components/ProjectPage/sub/ProjectListComponent.jsx';
import ProjectTypeComponent from '../components/ProjectPage/sub/ProjectTypeComponent.jsx';
import ProjectInfoComponent from '../components/ProjectPage/sub/ProjectInfoComponent.jsx';
import useInput from '../hooks/useInput.js';
import ProjectStagesComponent from '../components/ProjectPage/sub/ProjectStagesComponent.jsx';
import ProjectReviewComponent from '../components/ProjectPage/sub/ProjectReviewComponent.jsx';

function ProjectPage({ projects, onDeleteProject, onAddProject, onSubmitEdit }) {
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [projectType, setType] = useState('');
  const [code, onCodeChange, setCode] = useInput('');
  const [name, onNameChange, setName] = useInput('');
  const [description, onDescChange, setDesc] = useInput('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [pm, setPM] = useState('');
  const [bp, setBP] = useState('');
  const [requestingUnit, setUnit] = useState('');
  const [owner, onOwnerChange, setOwner] = useInput('');
  const [projectDate, onProjectDateChange, setProjectDate] = useInput('');
  const [targetGoLive, onTargetDateChange, setTargetDate] = useInput('');
  const [currentStage, setCurrentStage] = useState('');
  const [stagesHistory, setStagesHistory] = useState([]);
  const [supportingDocuments, setSupportingDocuments] = useState([]);

  //Format object for api request body
  const projectFormat = {
    code: code,
    name: name,
    description: description,
    category: category,
    projectType: projectType,
    status: status,
    pm: pm,
    bp: bp,
    requestingUnit: requestingUnit,
    owner: owner,
    projectDate: projectDate,
    targetGoLive: targetGoLive,
    stagesHistory: stagesHistory,
    supportingDocuments: supportingDocuments
  };

  //Reset input
  const resetInput = () => {
    setId('');
    setType('');
    setCode('');
    setName('');
    setDesc('');
    setCategory('');
    setStatus('');
    setPM('');
    setBP('');
    setUnit('');
    setOwner('');
    setProjectDate('');
    setTargetDate('');
    setCurrentStage('');
    setStagesHistory([]);
    setSupportingDocuments([]);
  };

  //Selecting project for edit
  const setProject = (project) => {
    setId(project.id);
    setType(project.projectType);
    setCode(project.code);
    setName(project.name);
    setDesc(project.description);
    setCategory(project.category);
    setStatus(project.status);
    setPM(project.pm);
    setBP(project.bp);
    setUnit(project.requestingUnit);
    setOwner(project.owner);
    setProjectDate(project.projectDate);
    setTargetDate(project.targetGoLive);
    setCurrentStage(project.currentStage);
    setStagesHistory(project.stagesHistory);
    setSupportingDocuments(project.supportingDocuments);
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

  const onEditProject = (projectId) => {
    const editedProject = projects.find((project) => project.id === projectId);

    if (!editedProject) return;

    setProject(editedProject);
    setIsEdit(true);
    setPageIndex(2);
  };

  const onCodeSelected = (code) => {
    const project = projects.find(
      (project) => String(project.code) === String(code)
    );

    if (!project) return;

    setCode(project.code);
    setName(project.name);
    setDesc(project.description);
  };

  const projectInfo = {
    code, onCodeChange, onCodeSelected,
    name, onNameChange,
    description, onDescChange,
    category, setCategory,
    status, setStatus,
    pm, setPM,
    bp, setBP,
    requestingUnit, setUnit,
    owner, onOwnerChange,
    projectDate, onProjectDateChange,
    targetGoLive, onTargetDateChange
  };

  const newProject = {
    projectType, code, name, description, category, status, pm, bp, requestingUnit, owner, projectDate, targetGoLive,
    currentStage, stagesHistory, supportingDocuments
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
      currentStage: currentStage,
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

  return (
    <section className="project-page">
      { pageIndex === 0 &&
          (
            <ProjectListComponent
              projects={projects}
              nextPage={nextPage}
              onDeleteProject={onDeleteProject}
              onEditProject={onEditProject}/>
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
          onPreviousPage={prevPage}
          onNextPage={nextPage}/>
      )}
      { pageIndex === 5 && (
        <ProjectReviewComponent
          onBackPressed={onBackPressed}
          onPreviousPage={prevPage}
          pageIndex={pageIndex}
          newProject={newProject}
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
