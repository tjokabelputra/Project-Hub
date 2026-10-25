import React from 'react';
import PropTypes from 'prop-types';
import PageIndicatorComponent from '../PageIndicatorComponent.jsx';
import { LuFilePen, LuFilePlus } from 'react-icons/lu';
import ProjectInputHeaderComponent from '../ProjectInputHeaderComponent.jsx';
import PageFooterComponent from '../PageFooterComponent.jsx';

function ProjectTypeComponent({ pageIndex, type, onTypeChange, onBackPressed, nextPage }) {
  const listInputs = [type];
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
        <PageFooterComponent
          isFirstPage={true}
          listInputs={listInputs}
          onPreviousPage={onBackPressed}
          onNextPage={nextPage}/>
      </div>
    </div>
  );
}

ProjectTypeComponent.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onBackPressed: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default ProjectTypeComponent;