import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProjectInputHeaderComponent from '../ProjectInputHeaderComponent.jsx';
import PageIndicatorComponent from '../PageIndicatorComponent.jsx';
import GeneralInputComponent from '../../input/GeneralInputComponent.jsx';
import DropdownInputComponent from '../../input/DropdownInputComponent.jsx';
import { dummyProjectCategories, dummyProjectStatus } from '../../../data/dummy.js';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SearchableSelectComponent from '../../input/SearchableSelectComponent.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateInputs } from '../../../states/shared/action.js';
import PageFooterComponent from "../PageFooterComponent.jsx";

function ProjectInfoComponent({ pageIndex, type, projects, onBackPressed, projectInfo, onPreviousPage, onNextPage })
{
  const pms = useSelector((states) => states.pms);
  const bps = useSelector((states) => states.bps);
  const units = useSelector((states) => states.units);
  const dispatch = useDispatch();

  const {
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
  } = projectInfo;

  const inputListFirst = [code, name, description, category, status];
  const inputListSecond = [pm, bp, requestingUnit, owner, projectInfo, targetGoLive];

  useEffect(() => {
    dispatch(asyncPopulateInputs());
  }, [dispatch]);

  const isCodeDuplicate =
      type === 'New' && projects.some((project) =>
        String(project.id).trim().toLowerCase() === String(code ?? '').trim().toLowerCase());

  const isNameDuplicate =
      type === 'New' && projects.some((project) =>
        String(project.name).trim().toLowerCase() === String(name ?? '').trim().toLowerCase());

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
                    value={description}
                    onChange={onDescChange}
                    disabled={type === 'Existing'}/>
                </div>
                <DropdownInputComponent
                  id="category"
                  label="Kategori Project"
                  placeholder="Kategori Project"
                  value={category}
                  onValueChange={setCategory}
                  options={dummyProjectCategories}/>
                <DropdownInputComponent
                  id="status"
                  label="Status Project"
                  placeholder="Status Project"
                  value={status}
                  onValueChange={setStatus}
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
                  onValueChange={setPM}/>
                <SearchableSelectComponent
                  id="bp"
                  label="Nama BP"
                  placeholder="Masukan Nama BP"
                  options={bps}
                  optionsId="id"
                  optionsValue="name"
                  value={bp}
                  onValueChange={setBP}/>
                <SearchableSelectComponent
                  id="unit"
                  label="Unit Pengusul"
                  placeholder="Masukan Nama Unit"
                  options={units}
                  optionsId="id"
                  optionsValue="name"
                  value={requestingUnit}
                  onValueChange={setUnit}
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
                  value={targetGoLive}
                  onChange={onTargetDateChange}/>
              </div>
            )}
          </div>
        </div>
        <PageFooterComponent
          listInputs={pageIndex === 2 ? inputListFirst : inputListSecond}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage} />
      </div>
    </div>
  );
}

ProjectInfoComponent.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  onBackPressed: PropTypes.func.isRequired,
  projectInfo: PropTypes.shape({
    code: PropTypes.string.isRequired,
    onCodeChange: PropTypes.func.isRequired,
    onCodeSelected: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onNameChange: PropTypes.func.isRequired,
    desc: PropTypes.string.isRequired,
    onDescChange: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    setStatus: PropTypes.func.isRequired,
    PM: PropTypes.string.isRequired,
    setPM: PropTypes.func.isRequired,
    BP: PropTypes.string.isRequired,
    setBP: PropTypes.func.isRequired,
    unit: PropTypes.string.isRequired,
    setUnit: PropTypes.func.isRequired,
    owner: PropTypes.string.isRequired,
    onOwnerChange: PropTypes.func.isRequired,
    projectDate: PropTypes.string.isRequired,
    onProjectDateChange: PropTypes.func.isRequired,
    targetDate: PropTypes.string.isRequired,
    onTargetDateChange: PropTypes.func.isRequired
  }),
  onPreviousPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
};

export default ProjectInfoComponent;