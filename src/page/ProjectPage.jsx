import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectListComponent from '../components/ProjectPage/sub/ProjectListComponent.jsx';
import ProjectTypeComponent from '../components/ProjectPage/sub/ProjectTypeComponent.jsx';
import ProjectInfoComponent from '../components/ProjectPage/sub/ProjectInfoComponent.jsx';
import useInput from '../hooks/useInput.js';

function ProjectPage({ projects, onDeleteProject }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [type, setType] = useState('');
  const [code, onCodeChange, setCode] = useInput('');
  const [name, onNameChange, setName] = useInput('');
  const [desc, onDescChange, setDesc] = useInput('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [PM, setPM] = useState('');
  const [BP, setBP] = useState('');
  const [unit, setUnit] = useState('');
  const [owner, onOwnerChange, setOwner] = useInput('');
  const [projectDate, onProjectDateChange, setProjectDate] = useInput('');
  const [targetDate, onTargetDateChange, setTargetDate] = useInput('');

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
    desc, onDescChange,
    category, setCategory,
    status, setStatus,
    PM, setPM,
    BP, setBP,
    unit, setUnit,
    owner, onOwnerChange,
    projectDate, onProjectDateChange,
    targetDate, onTargetDateChange
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
              type={type}
              onTypeChange={setType}
              onBackPressed={onBackPressed}
              nextPage={nextPage}/>
          )
      }
      { (pageIndex === 2 || pageIndex === 3) && (
        <ProjectInfoComponent
          pageIndex={pageIndex}
          type={type}
          projects={projects}
          onBackPressed={onBackPressed}
          projectInfo={projectInfo}
          onPreviousPage={prevPage}
          onNextPage={nextPage}/>
      )}
    </section>
  );
}

ProjectPage.propTypes = {
  projects: PropTypes.array.isRequired,
  onDeleteProject: PropTypes.func.isRequired
};

export default ProjectPage;