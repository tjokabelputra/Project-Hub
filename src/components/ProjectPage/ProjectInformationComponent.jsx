import React from 'react';
import { formatDate, formatStatus } from '../../util/util.js';

function ProjectInformationComponent({ project }) {
  return (
    <div className="project-information">
      <div className="project-information__content-left">
        <div className="project-information__info-content">
          <p>Kode Project:</p>
          <p>{project.code}</p>
        </div>
        <div className="project-information__info-content">
          <p>Nama Project:</p>
          <p>{project.name}</p>
        </div>
        <div className="project-information__info-content">
          <p>Deskripsi Project:</p>
          <p>{project.description}</p>
        </div>
        <div className="project-information__info-content">
          <p>Kategori Project:</p>
          <p>{project.category}</p>
        </div>
        <div className="project-information__info-content">
          <p>Status Project:</p>
          <p>{formatStatus(project.status)}</p>
        </div>
      </div>
      <div className="project-information__content-right">
        <div className="project-information__info-content">
          <p>Nama PM:</p>
          <p>{project.pm}</p>
        </div>
        <div className="project-information__info-content">
          <p>Nama BP:</p>
          <p>{project.bp}</p>
        </div>
        <div className="project-information__info-content">
          <p>Unit Pengusul:</p>
          <p>{project.requestingUnit}</p>
        </div>
        <div className="project-information__info-content">
          <p>Nama Owner/PIC:</p>
          <p>{project.owner}</p>
        </div>
        <div className="project-information__info-content">
          <p>Tanggal Project:</p>
          <p>{formatDate(project.projectDate)}</p>
        </div>
        <div className="project-information__info-content">
          <p>Target Go Live:</p>
          <p>{formatDate(project.targetGoLive)}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectInformationComponent;