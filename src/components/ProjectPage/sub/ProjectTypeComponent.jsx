import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import PageIndicatorComponent from '../PageIndicatorComponent.jsx';
import { LuFilePen, LuFilePlus } from 'react-icons/lu';

function ProjectTypeComponent({ pageIndex, type, onTypeChange, onBackPressed, nextPage }) {
  return (
    <div className="project-input-layout__first">
      <div className="project-input__header">
        <div
          className="project-input__back"
          onClick={onBackPressed}>
          <FaArrowLeft />
        </div>
        <h1>Upload Project</h1>
      </div>
      <div className="project-type__main">
        <PageIndicatorComponent currentPage={pageIndex}/>
        <div className="project-type__options-layout">
          <div className="project-type__options">
            <p className="project-type__options-title">Pilih Jenis Project</p>
            <div className="project-type__options-choice">
              <div
                className= {
                  `project-type__new ${ type === 'New' ? 'project-type__selected' : ''}`
                }
                onClick={() => onTypeChange('New')}>
                <div className="project-type__new-icon">
                  <LuFilePlus />
                </div>
                <div className="project-type__new-info">
                  <p>Project Baru</p>
                  <p>Project yang belum memiliki kode project.</p>
                </div>
              </div>
              <div
                className= {
                  `project-type__existing ${ type === 'Existing' ? 'project-type__selected' : ''}`
                }
                onClick={() => onTypeChange('Existing')}>
                <div className="project-type__existing-icon">
                  <LuFilePen />
                </div>
                <div className="project-type__existing-info">
                  <p>Project Existing</p>
                  <p>Project yang sudah memiliki kode project.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="project-type__actions">
          <button
            type="button"
            className={ `project-type__button-next ${ type !== '' ? 'project-type__button-enabled' : ''}`}
            onClick={nextPage}>Selanjutnya <FaArrowRight/></button>
        </div>
      </div>
    </div>
  );
}

export default ProjectTypeComponent;