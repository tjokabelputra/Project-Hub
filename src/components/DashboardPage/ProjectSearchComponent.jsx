import React, { useState } from 'react';
import ProjectSearchInputComponent from './ProjectSearchInputComponent.jsx';
import useInput from '../../hooks/useInput.js';
import ProjectSearchTableComponent from './ProjectSearchTableComponent.jsx';
import { useDispatch } from 'react-redux';
import { asyncFilterProject } from '../../states/projects/action.js';

function ProjectSearchComponent({ projects, pagination, enums, pms, bps, units }) {
  const [name, onNameChange, setName] = useInput('');
  const [status, setStatus] = useState('');
  const [steps, setSteps] = useState('');
  const [projectManager, setProjectManager] = useState('');
  const [businessPartner, setBusinessPartner] = useState('');
  const [priority, setPriority] = useState('');
  const [unit, setUnit] = useState('');
  const [workUnit, setWorkUnit] = useState('');
  const [year, onYearChange, setYear] = useInput('');

  const [appliedFilter, setAppliedFilter] = useState({});

  const dispatch = useDispatch();

  const filterInfo = {
    name, onNameChange, status, setStatus, steps, setSteps, projectManager, setProjectManager,
    businessPartner, setBusinessPartner, priority, setPriority, unit, setUnit,
    workUnit, setWorkUnit, year, onYearChange
  };

  const onResetFilter = () => {
    setName('');
    setStatus('');
    setSteps('');
    setProjectManager('');
    setBusinessPartner('');
    setPriority('');
    setUnit('');
    setWorkUnit('');
    setYear('');

    const emptyFilter = {};

    setAppliedFilter(emptyFilter);

    dispatch(
      asyncFilterProject({
        page: 1,
        appliedFilter: emptyFilter,
      })
    );
  };

  const onSearchProject = () => {
    const selectedPm = pms.find(
      (pm) => pm.nama === projectManager
    );

    const selectedBp = bps.find(
      (bp) => bp.nama === businessPartner
    );

    const selectedUnit = units.find(
      (u) => u.nama === unit
    );

    const filters = {
      name,
      status: status.toUpperCase().replaceAll(' ', '_'),
      category: '',
      unitId: selectedUnit?.id || '',
      priority: priority.toUpperCase(),
      step: steps.toUpperCase().replaceAll(' ', '_'),
      year,
      pmId: selectedPm?.id || '',
      bpId: selectedBp?.id || '',
      workUnit,
    };

    setAppliedFilter(filters);

    dispatch(
      asyncFilterProject({
        page: 1,
        appliedFilter: filters,
      })
    );
  };

  const onPageChange = (page) => {
    dispatch(
      asyncFilterProject({
        page,
        appliedFilter,
      })
    );
  };

  return (
    <div className="project-search">
      <h3>Filter & Pencarian Project</h3>
      <div className="project-search__input">
        <ProjectSearchInputComponent
          filterInfo={filterInfo}
          enums={enums}
          pms={pms}
          bps={bps}
          units={units}/>
        <div className="project-search__actions">
          <button
            type="button"
            className="project-search__clear"
            onClick={onResetFilter}>
                  Hapus Filter
          </button>
          <button
            type="button"
            className="project-search__find"
            onClick={onSearchProject}>
                Cari Project
          </button>
        </div>
      </div>
      <ProjectSearchTableComponent
        projects={projects}
        appliedFilter={appliedFilter}
        pagination={pagination}
        onPageChange={onPageChange}/>
    </div>
  );
}

export default ProjectSearchComponent;