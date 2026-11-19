import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProjectInputHeaderComponent from '../ProjectInputHeaderComponent.jsx';
import PageIndicatorComponent from '../PageIndicatorComponent.jsx';
import GeneralInputComponent from '../../input/GeneralInputComponent.jsx';
import DropdownInputComponent from '../../input/DropdownInputComponent.jsx';
import SearchableSelectComponent from '../../input/SearchableSelectComponent.jsx';
import { useDispatch, useSelector } from 'react-redux';
import PageFooterComponent from '../PageFooterComponent.jsx';
import { asyncGetEnums } from '../../../states/enums/action.js';
import { formatLabel } from '../../../util/util.js';
import { asyncGetPms } from '../../../states/pms/action.js';
import { asyncGetBps } from '../../../states/bps/action.js';
import { asyncGetUnits } from '../../../states/unit/action.js';

function ProjectInfoComponent({ pageIndex, type, projects, projectId, onBackPressed, projectInfo, onPreviousPage, onNextPage, isEdit })
{
  const pms = useSelector((states) => states.pms);
  const bps = useSelector((states) => states.bps);
  const units = useSelector((states) => states.units);
  const enums = useSelector((states) => states.enums);
  const dispatch = useDispatch();

  const {
    code, onCodeChange,
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
  } = projectInfo;

  const inputListFirst = [name, description, category, status, priority, ...(type !== 'New' ? [code] : [])];
  const inputListSecond = [pm, bp, requestingUnit, owner, projectInfo, targetGoLive];

  useEffect(() => {
    dispatch(asyncGetPms());
    dispatch(asyncGetBps());
    dispatch(asyncGetUnits());
    dispatch(asyncGetEnums());
  }, [dispatch]);

  const isCodeDuplicate = projects.some((project) => {
    const sameCode =
        String(project.kodeProject || '').trim().toLowerCase() ===
        String(code || '').trim().toLowerCase();

    const isDifferentProject =
        String(project.id) !== String(projectId);

    return sameCode && (!isEdit || isDifferentProject);
  });

  const isNameDuplicate =
      projects.some((project) => String(project.nama).trim().toLowerCase() === String(name ?? '').trim().toLowerCase());

  return (
    <div className="project-input-layout__first">
      <ProjectInputHeaderComponent onBackPressed={onBackPressed} isEdit={isEdit} />
      <div className="project-info__main">
        <PageIndicatorComponent currentPage={pageIndex} />
        <div className="project-info__input-layout">
          <div>
            <p className="project-info__title">Informasi Project</p>
            { pageIndex === 2 ? (
              <div className="project-info__inputs">
                <div>
                  <GeneralInputComponent
                    id="code"
                    label="Kode Project"
                    type="text"
                    placeholder="PRJ-XXX"
                    value={code}
                    onChange={onCodeChange}/>

                  {isCodeDuplicate && (
                    <p className="input-error">
                        Kode project sudah digunakan.
                    </p>
                  )}
                </div>
                <div>
                  <GeneralInputComponent
                    id="name"
                    label="Nama Project"
                    type="text"
                    placeholder="Nama Project"
                    value={name}
                    onChange={onNameChange}/>
                  {(isNameDuplicate && !isEdit) && (
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
                    onChange={onDescChange}/>
                </div>
                <DropdownInputComponent
                  id="category"
                  label="Kategori Project"
                  placeholder="Kategori Project"
                  value={category}
                  onValueChange={setCategory}
                  options={(enums?.kategori || []).map((item) => ({
                    id: item,
                    value: item.replaceAll('_', ' ')
                  }))}
                />
                <DropdownInputComponent
                  id="status"
                  label="Status Project"
                  placeholder="Status Project"
                  value={status}
                  onValueChange={setStatus}
                  options={(enums?.status || []).map((item) => ({
                    id: item,
                    value: formatLabel(item)
                  }))}
                />
                <DropdownInputComponent
                  id="priority"
                  label="Prioritas"
                  placeholder="Prioritas Project"
                  value={priority}
                  onValueChange={setPriority}
                  options={(enums?.prioritas || []).map((item) => ({
                    id: item,
                    value: formatLabel(item)
                  }))}
                />
              </div>
            ) : (
              <div className="project-info__inputs">
                <SearchableSelectComponent
                  id="pm"
                  label="Nama PM"
                  placeholder="Masukan Nama PM"
                  options={pms}
                  optionsId="nama"
                  optionsValue="nama"
                  value={pm}
                  onValueChange={setPM}/>
                <SearchableSelectComponent
                  id="bp"
                  label="Nama BP"
                  placeholder="Masukan Nama BP"
                  options={bps}
                  optionsId="nama"
                  optionsValue="nama"
                  value={bp}
                  onValueChange={setBP}/>
                <SearchableSelectComponent
                  id="unit"
                  label="Unit Pengusul"
                  placeholder="Masukan Nama Unit"
                  options={units}
                  optionsId="nama"
                  optionsValue="nama"
                  value={requestingUnit}
                  onValueChange={setUnit}/>
                <GeneralInputComponent
                  id="owner"
                  label="Owner/PIC"
                  type="text"
                  placeholder="Masukan Owner/PIC"
                  value={owner}
                  onChange={onOwnerChange}/>
                <div className="project-info__developer">
                  <label className="project-info__developer-label">
                    Unit Kerja
                  </label>
                  <div className="project-info__developer-options">
                    {['ADV', 'RDL', 'WDL', 'DMA'].map((unit) => (
                      <label key={unit} className="project-info__developer-option">
                        <input
                          type="checkbox"
                          checked={workingUnits.includes(unit)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setWorkingUnits([...workingUnits, unit]);
                            } else {
                              setWorkingUnits(
                                workingUnits.filter((item) => item !== unit)
                              );
                            }
                          }}
                        />
                        <span>{unit}</span>
                      </label>
                    ))}
                  </div>

                  <small>Pilih satu atau lebih.</small>
                </div>
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
          onPreviousPage={(isEdit && pageIndex === 2) ? onBackPressed :onPreviousPage}
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
  onNextPage: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default ProjectInfoComponent;