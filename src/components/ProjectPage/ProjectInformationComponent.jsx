
import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatLabel } from '../../util/util.js';

function ProjectInformationComponent({ project }) {
  return (
    <div className="project-information">
      <div className="project-information__content-left">
        <div className="project-information__info-content">
          <p>Kode Project:</p>
          <p>{project.kodeProject}</p>
        </div>
        <div className="project-information__info-content">
          <p>Nama Project:</p>
          <p>{project.nama}</p>
        </div>
        <div className="project-information__info-content">
          <p>Deskripsi Project:</p>
          <p>{project.deskripsi}</p>
        </div>
        <div className="project-information__info-content">
          <p>Kategori Project:</p>
          <p>{project.kategori ? project.kategori.replace('_', ' ') : ' '}</p>
        </div>
        <div className="project-information__info-content">
          <p>Jenis Project:</p>
          <p>{formatLabel(project.jenis)}</p>
        </div>
        <div className="project-information__info-content">
          <p>Status Project:</p>
          <p>{formatLabel(project.status)}</p>
        </div>
        <div className="project-information__info-content">
          <p>Prioritas:</p>
          <p>{formatLabel(project.prioritas)}</p>
        </div>
      </div>

      <div className="project-information__content-right">
        <div className="project-information__info-content">
          <p>Nama PM:</p>
          <p>{project.pm?.nama || project.pm}</p>
        </div>
        <div className="project-information__info-content">
          <p>Nama BP:</p>
          <p>{project.bp?.nama || project.bp}</p>
        </div>
        <div className="project-information__info-content">
          <p>Unit Pengusul:</p>
          <p>{project.unitPengusul?.nama || project.unitPengusul}</p>
        </div>
        <div className="project-information__info-content">
          <p>Unit Kerja Developer:</p>
          <p>{project.unitKerjaDeveloper?.join(', ')}</p>
        </div>
        <div className="project-information__info-content">
          <p>Nama Owner/PIC:</p>
          <p>{project.ownerPic}</p>
        </div>
        <div className="project-information__info-content">
          <p>Tanggal Project:</p>
          <p>{project.tanggalProject ? formatDate(project.tanggalProject) : '-'}</p>
        </div>
        <div className="project-information__info-content">
          <p>Target Go Live:</p>
          <p>{project.targetGoLive ? formatDate(project.targetGoLive) : '-'}</p>
        </div>
      </div>
    </div>
  );
}

ProjectInformationComponent.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectInformationComponent;