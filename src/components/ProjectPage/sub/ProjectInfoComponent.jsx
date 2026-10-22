import React, { useEffect } from 'react';
import ProjectInputHeaderComponent from '../ProjectInputHeaderComponent.jsx';
import PageIndicatorComponent from '../PageIndicatorComponent.jsx';
import GeneralInputComponent from '../../input/GeneralInputComponent.jsx';
import DropdownInputComponent from '../../input/DropdownInputComponent.jsx';
import { dummyProjectCategories, dummyProjectStatus } from '../../../data/dummy.js';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SearchableSelectComponent from '../../input/SearchableSelectComponent.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateInputs } from '../../../states/shared/action.js';

function ProjectInfoComponent({
  pageIndex,
  type,
  projects,
  onBackPressed,
  code,
  onCodeChange,
  onCodeSelected,
  name,
  onNameChange,
  desc,
  onDescChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  pm,
  onPMChange,
  bp,
  onBPChange,
  unit,
  onUnitChange,
  owner,
  onOwnerChange,
  projectDate,
  onProjectDateChange,
  targetDate,
  onTargetDateChange,
  onPreviousPage,
  onNextPage
})
{
  const pms = useSelector((states) => states.pms);
  const bps = useSelector((states) => states.bps);
  const units = useSelector((states) => states.units);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateInputs());
  }, [dispatch]);

  const isCodeDuplicate =
      type === 'New' && projects.some((project) =>
        String(project.id).trim().toLowerCase() === String(code ?? '').trim().toLowerCase());

  const isNameDuplicate =
      type === 'New' && projects.some((project) =>
        String(project.name).trim().toLowerCase() === String(name ?? '').trim().toLowerCase());

  const isNextDisabled = pageIndex === 2
    ? ([code, name, desc, category, status].some((value) => !String(value ?? '').trim())) || isCodeDuplicate || isNameDuplicate
    : ([pm, bp, unit, owner, projectDate, targetDate].some((value) => !String(value ?? '').trim()));

  return (
    <div className="project-input-layout__first">
      <ProjectInputHeaderComponent onBackPressed={onBackPressed} />
      <div className="project-info__main">
        <PageIndicatorComponent currentPage={pageIndex} />
        <div className="project-info__input-layout">
          <div>
            <p className="project-info__title">Informasi Project</p>
            { pageIndex === 2 ? (
              <div className="project-info__inputs">
                { type === 'New' ? (
                  <div>
                    <GeneralInputComponent
                      id="code"
                      label="Kode Project"
                      type="text"
                      placeholder="PRJ-XXX"
                      value={code}
                      onChange={onCodeChange} />

                    {isCodeDuplicate && (
                      <p className="input-error">Kode project sudah digunakan.</p>
                    )}
                  </div>
                ) : (
                  <SearchableSelectComponent
                    id="code"
                    label="Kode Project"
                    placeholder="PRJ-XXX"
                    options={projects}
                    optionsId="id"
                    optionsValue="id"
                    value={code}
                    onValueChange={onCodeSelected}/>
                )}
                <div>
                  <GeneralInputComponent
                    id="name"
                    label="Nama Project"
                    type="text"
                    placeholder="Nama Project"
                    value={name}
                    onChange={onNameChange}
                    disabled={type === 'Existing'}/>
                  {isNameDuplicate && (
                    <p className="input-error">Nama project sudah digunakan.</p>
                  )}
                </div>
                <div className="project-info__input-wide">
                  <GeneralInputComponent
                    id="desc"
                    label="Deskripsi Project"
                    type="text"
                    placeholder="Deskripsi Singkat Project"
                    value={desc}
                    onChange={onDescChange}
                    disabled={type === 'Existing'}/>
                </div>
                <DropdownInputComponent
                  id="category"
                  label="Kategori Project"
                  placeholder="Kategori Project"
                  value={category}
                  onValueChange={onCategoryChange}
                  options={dummyProjectCategories}/>
                <DropdownInputComponent
                  id="status"
                  label="Status Project"
                  placeholder="Status Project"
                  value={status}
                  onValueChange={onStatusChange}
                  options={dummyProjectStatus}/>
              </div>
            ) : (
              <div className="project-info__inputs">
                <SearchableSelectComponent
                  id="pm"
                  label="Nama PM"
                  placeholder="Masukan Nama PM"
                  options={pms}
                  optionsId="id"
                  optionsValue="name"
                  value={pm}
                  onValueChange={onPMChange}/>
                <SearchableSelectComponent
                  id="bp"
                  label="Nama BP"
                  placeholder="Masukan Nama BP"
                  options={bps}
                  optionsId="id"
                  optionsValue="name"
                  value={bp}
                  onValueChange={onBPChange}/>
                <SearchableSelectComponent
                  id="unit"
                  label="Unit Pengusul"
                  placeholder="Masukan Nama Unit"
                  options={units}
                  optionsId="id"
                  optionsValue="name"
                  value={unit}
                  onValueChange={onUnitChange}
                  minInput={1}/>
                <GeneralInputComponent
                  id="owner"
                  label="Owner/PIC"
                  type="text"
                  placeholder="Masukan Owner/PIC"
                  value={owner}
                  onChange={onOwnerChange}/>
                <GeneralInputComponent
                  id="date"
                  label="Tanggal Project"
                  type="date"
                  placeholder=""
                  value={projectDate}
                  onChange={onProjectDateChange} />
                <GeneralInputComponent
                  id="date"
                  label="Target Go Live"
                  type="date"
                  placeholder=""
                  value={targetDate}
                  onChange={onTargetDateChange}/>
              </div>
            )}
          </div>
        </div>
        <div className="project-info__actions">
          <button
            type="button"
            className="project-info__prev"
            onClick={onPreviousPage}><FaArrowLeft /> Sebelumnya</button>
          <button
            type="button"
            className={`project-info__next ${isNextDisabled ? 'project-info__next-disable' : ''}`}
            onClick={onNextPage}
            disabled={isNextDisabled}>Selanjutnya <FaArrowRight/></button>
        </div>
      </div>
    </div>
  );
}

export default ProjectInfoComponent;