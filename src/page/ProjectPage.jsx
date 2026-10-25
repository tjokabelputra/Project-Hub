import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ProjectListComponent from '../components/ProjectPage/sub/ProjectListComponent.jsx';
import ProjectTypeComponent from '../components/ProjectPage/sub/ProjectTypeComponent.jsx';
import ProjectInfoComponent from '../components/ProjectPage/sub/ProjectInfoComponent.jsx';
import useInput from '../hooks/useInput.js';
import ProjectStagesComponent from '../components/ProjectPage/sub/ProjectStagesComponent.jsx';
import ProjectReviewComponent from '../components/ProjectPage/sub/ProjectReviewComponent.jsx';

function ProjectPage({ projects, onDeleteProject, onAddProject }) {
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
  const [preCommitteeDate, onPreCommitteeDateChange, setPreCommitteeDate] = useInput('');
  const [preCommitteeStatus, setPreCommitteeStatus] = useState('');
  const [preCommitteeNote, onPreCommitteeNoteChange, setPreCommitteeNote] = useInput('');
  const [committeeBDate, onCommitteeBDateChange, setCommitteeBDate] = useInput('');
  const [committeeBStatus, setCommitteeBStatus] = useState('');
  const [committeeBNote, onCommitteeBNoteChange, setCommitteeBNote] = useInput('');
  const [committeeADate, onCommitteeADateChange, setCommitteeADate] = useInput('');
  const [committeeAStatus, setCommitteeAStatus] = useState('');
  const [committeeANote, onCommitteeANoteChange, setCommitteeANote] = useInput('');
  const [supportingDocuments, setSupportingDocuments] = useState([]);

  const projectFormat = {
    id: `ID-${+new Date()}`,
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
    preCommittee: {
      date: preCommitteeDate,
      status: preCommitteeStatus,
      notes: preCommitteeNote
    },
    committeeTIB: {
      date: committeeBDate,
      status: committeeBStatus,
      notes: committeeBNote
    },
    committeeTIA: {
      date: committeeADate,
      status: committeeAStatus,
      notes: committeeANote
    },
    supportingDocuments: supportingDocuments
  };

  const resetInput = () => {
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
    setPreCommitteeDate('');
    setPreCommitteeStatus('');
    setPreCommitteeNote('');
    setCommitteeBDate('');
    setCommitteeBStatus('');
    setCommitteeBNote('');
    setCommitteeADate('');
    setCommitteeAStatus('');
    setCommitteeANote('');
    setSupportingDocuments([]);
  };

  const onBackPressed = () => {
    setPageIndex(0);
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

  const onCodeSelected = (code) => {
    const project = projects.find(
      (project) => String(project.id) === String(code)
    );

    if (!project) return;

    setCode(project.id);
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

  const projectStatusDocsInfo = {
    preCommitteeDate, onPreCommitteeDateChange, preCommitteeStatus, setPreCommitteeStatus, preCommitteeNote, onPreCommitteeNoteChange,
    committeeBDate, onCommitteeBDateChange, committeeBStatus, setCommitteeBStatus, committeeBNote, onCommitteeBNoteChange,
    committeeADate, onCommitteeADateChange, committeeAStatus, setCommitteeAStatus, committeeANote, onCommitteeANoteChange,
    supportingDocuments, setSupportingDocuments
  };

  const newProject = {
    projectType, code, name, description, category, status, pm, bp, requestingUnit, owner, projectDate, targetGoLive,
    preCommitteeDate, preCommitteeStatus, preCommitteeNote, committeeBDate, committeeBStatus, committeeBNote,
    committeeADate, committeeAStatus, committeeANote, supportingDocuments
  };

  const addNewProject = () => {
    onAddProject(projectFormat);
    setPageIndex(0);
  };

  return (
    <section className="project-page">
      { pageIndex === 0 &&
          (
            <ProjectListComponent
              projects={projects}
              nextPage={nextPage}
              onDeleteProject={onDeleteProject}/>
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
          onNextPage={nextPage}/>
      )}
      { pageIndex === 4 && (
        <ProjectStagesComponent
          onBackPressed={onBackPressed}
          pageIndex={pageIndex}
          projectStatusDocs={projectStatusDocsInfo}
          onPreviousPage={prevPage}
          onNextPage={nextPage}/>
      )}
      { pageIndex === 5 && (
        <ProjectReviewComponent
          onBackPressed={onBackPressed}
          onPreviousPage={prevPage}
          pageIndex={pageIndex}
          newProject={newProject}
          onNextPage={addNewProject}/>
      )}
    </section>
  );
}

ProjectPage.propTypes = {
  projects: PropTypes.array.isRequired,
  onDeleteProject: PropTypes.func.isRequired
};

export default ProjectPage;