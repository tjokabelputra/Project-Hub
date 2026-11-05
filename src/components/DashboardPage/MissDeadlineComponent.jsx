import React from 'react';
import { MdCheckCircleOutline, MdWarningAmber } from 'react-icons/md';
import { calculateDaysLate } from '../../util/util.js';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';

function MissDeadlineComponent({ projects, total }) {
  const missDeadlineExist = total > 0;
  const navigate = useNavigate();

  return (
    <div className={`missed-deadline ${missDeadlineExist ? 'missed-deadline--missed' : ''}`}>
      <div className="missed-deadline__main">
        <div className={`missed-deadline__icon ${missDeadlineExist ? 'missed-deadline__icon-missed' : ''}`}>
          {missDeadlineExist ? (
            <MdWarningAmber />
          ) : (
            <MdCheckCircleOutline />
          )}
        </div>
        <div className="missed-deadline__info">
          <div className="missed-deadline__content">
            <p className="missed-deadline__title">
              {missDeadlineExist
                ? `${total} Proyek Membutuhkan Perhatian Khusus`
                : 'Semua Proyek Berjalan Sesuai Jadwal'
              }
            </p>
            <p className="missed-deadline__desc">
              {missDeadlineExist
                ? 'Proyek berikut telah melampaui target milestone dan memerlukan akselerasi tindak lanjut segera.'
                : 'Tidak ada proyek yang melewati target deadline milestone saat ini. Performa timeline portofolio terjaga optimal.'
              }
            </p>
          </div>
          {missDeadlineExist && (
            <div className="missed-deadline__project-info">
              {projects.map((project) => {
                const daysLate = calculateDaysLate(project.targetGoLive);
                return (
                  <div className="missed-deadline__info-card">
                    <p key={project.id}>
                      <strong>{project.name}</strong>
                      {' '}  <strong>({project.code})</strong>
                      {' '} <strong className="missed-deadline__date-past">(Terlambat {daysLate} Hari)</strong>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {missDeadlineExist && (
        <button
          className="missed-deadline__navigate"
          onClick={() => navigate('/projects')}>Tinjau Project <FaArrowRight/></button>
      )}
    </div>
  );
}

export default MissDeadlineComponent;