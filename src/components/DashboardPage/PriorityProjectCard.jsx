import React from 'react';
import PropTypes from 'prop-types';
import { formatLabel } from '../../util/util.js';

function PriorityProjectCard({ priorities = [] }) {

  const getLatestCommittee = (stages) => {
    if (!stages || stages.length === 0) return '-';

    const latestStage = [...stages]
      .reverse()
      .find((stage) => stage.status !== 'PLANNED');

    const selectedStage = latestStage || stages[0];

    return formatLabel(selectedStage.tahap);
  };

  return (
    <div className="priority-project-card">
      <p className="priority-project-card__title">Project Prioritas</p>
      <div className="priority-project-card__content">
        <ul>
          {priorities.map((item) => (
            <li key={item.id}>
              <div className="priority-project-card__item">
                <div className="priority-project-card__project">
                  <p>{item.nama}</p>
                  <span>{item.kodeProject}</span>
                </div>
                <div
                  className={`priority-project-card__committee priority-project-card__committee-${getLatestCommittee(item.stages)
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}>
                  {getLatestCommittee(item.stages)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

PriorityProjectCard.propTypes = {
  projects: PropTypes.array.isRequired
};

export default PriorityProjectCard;