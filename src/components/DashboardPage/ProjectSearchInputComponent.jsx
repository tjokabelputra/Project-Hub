import React from 'react';
import GeneralInputComponent from '../input/GeneralInputComponent.jsx';
import { formatLabel } from '../../util/util.js';
import DropdownInputComponent from '../input/DropdownInputComponent.jsx';
import SearchableSelectComponent from '../input/SearchableSelectComponent.jsx';

function ProjectSearchInputComponent({ filterInfo, enums, pms, bps, units }) {
  return (
    <div className="project-search-input">
      <GeneralInputComponent
        id="name"
        label="Nama atau Kode Project"
        placeholder="Cari Project"
        value={filterInfo.name}
        onChange={filterInfo.onNameChange}/>
      <DropdownInputComponent
        id="status"
        label="Status Project"
        placeholder="Status Project"
        value={filterInfo.status}
        onValueChange={filterInfo.setStatus}
        options={(enums?.status || []).map((item) => ({
          id: item,
          value: formatLabel(item)
        }))}/>
      <DropdownInputComponent
        id="steps"
        label="Tahapan Komite"
        placeholder="Tahapan Project"
        value={filterInfo.steps}
        onValueChange={filterInfo.setSteps}
        options={[
          { id: 'Pra Komite', value: 'Pra Komite' },
          { id: 'Komite TI B', value: 'Komite TI B' },
          { id: 'Komite TI A', value: 'Komite TI A' }
        ]}/>
      <SearchableSelectComponent
        id="pm"
        label="Project Manager"
        placeholder="Masukan Nama PM"
        options={pms}
        optionsId="nama"
        optionsValue="nama"
        value={filterInfo.projectManager}
        onValueChange={filterInfo.setProjectManager}/>
      <SearchableSelectComponent
        id="bp"
        label="Business Partner"
        placeholder="Masukan Nama BP"
        options={bps}
        optionsId="nama"
        optionsValue="nama"
        value={filterInfo.businessPartner}
        onValueChange={filterInfo.setBusinessPartner}/>
      <DropdownInputComponent
        id="priority"
        label="Prioritas"
        placeholder="Prioritas Project"
        value={filterInfo.priority}
        onValueChange={filterInfo.setPriority}
        options={(enums?.prioritas || []).map((item) => ({
          id: item,
          value: formatLabel(item)
        }))} />
      <SearchableSelectComponent
        id="units"
        label="Unit Pengusul"
        placeholder="Masukan Nama Unit"
        options={units}
        optionId="nama"
        optionsValue="nama"
        value={filterInfo.unit}
        onValueChange={filterInfo.setUnit} />
      <DropdownInputComponent
        id="work"
        label="Unit Kerja"
        placeholder="Masukan Unit Kerja"
        value={filterInfo.workUnit}
        onValueChange={filterInfo.setWorkUnit}
        options={[
          { id: 'ADV', value: 'ADV' },
          { id: 'RDL', value: 'RDL' },
          { id: 'WDL', value: 'WDL' },
          { id: 'DMA', value: 'DMA' }
        ]}/>
      <GeneralInputComponent
        type="number"
        id="year"
        label="Tahun Project"
        placeholder="XXXX"
        value={filterInfo.year}
        onChange={filterInfo.onYearChange} />
    </div>
  );
}

export default ProjectSearchInputComponent;