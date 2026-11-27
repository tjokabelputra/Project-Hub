import React, { useState } from 'react';
import PropTypes from 'prop-types';

const stageLabels = { PRA_KOMITE: 'Pra Komite', KOMITE_TI_B: 'Komite TI B', KOMITE_TI_A: 'Komite TI A' };

function ProjectTimeline({ projects = [] }) {
  const [direction, setDirection] = useState('upcoming');
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const items = projects.flatMap((project) => [
    ...(project.stages || [])
      .filter((stage) => stage.tanggalRencana && (direction === 'previous' || (project.status !== 'SELESAI' && stage.status !== 'SELESAI')))
      .map((stage) => ({
        key: `${project.id}-${stage.tahap}`,
        project: project.nama,
        label: stageLabels[stage.tahap] || stage.tahap,
        date: stage.tanggalRencana,
        status: stage.status
      })),
    ...(project.targetGoLive && (direction === 'previous' || project.status !== 'SELESAI') ? [{
      key: `${project.id}-target`,
      project: project.nama,
      label: 'Target go-live',
      date: project.targetGoLive,
      status: project.status
    }] : [])
  ]).filter((item) => direction === 'upcoming'
    ? String(item.date).slice(0, 10) >= today
    : String(item.date).slice(0, 10) < today)
    .sort((a, b) => direction === 'upcoming'
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date));

  return (
    <section className="dashboard-extra-card">
      <h2>Timeline target dan tahapan</h2>
      <p>Jadwal tahapan komite dan target go-live project</p>
      <div className="dashboard-timeline__filters" role="group" aria-label="Pilih jadwal timeline">
        {[['upcoming', 'Mendatang'], ['previous', 'Sebelumnya']].map(([value, label]) => (
          <button key={value} type="button" aria-pressed={direction === value} onClick={() => setDirection(value)}>
            {label}
          </button>
        ))}
      </div>
      <div className="dashboard-timeline">
        {items.length ? items.map((item) => (
          <div className="dashboard-timeline__row" key={item.key}>
            <time dateTime={String(item.date).slice(0, 10)}>
              {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}
            </time>
            <span className="dashboard-timeline__dot" />
            <div>
              <strong>{item.project}</strong>
              <span>{item.label} · {item.status.replaceAll('_', ' ')}</span>
            </div>
          </div>
        )) : <p>Tidak ada jadwal {direction === 'upcoming' ? 'mendatang' : 'sebelumnya'}.</p>}
      </div>
    </section>
  );
}

ProjectTimeline.propTypes = { projects: PropTypes.array };

export default ProjectTimeline;
