import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import PageIndicatorComponent from '../PageIndicatorComponent.jsx';
import { LuFilePen, LuFilePlus } from 'react-icons/lu';
import ProjectInputHeaderComponent from '../ProjectInputHeaderComponent.jsx';

function ProjectTypeComponent({ pageIndex, type, onTypeChange, onBackPressed, nextPage }) {
  return (
    <div className="project-input-layout__first">
      <ProjectInputHeaderComponent onBackPressed={onBackPressed} />
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
            onClick={nextPage}
            disabled={type === ''}>Selanjutnya <FaArrowRight/></button>
        </div>
      </div>
    </div>
  );
}

export default ProjectTypeComponent;