import React from 'react';
import PropTypes from 'prop-types';
import { formatLabel } from '../../util/util.js';

function PriorityProjectCard({ priorities = [] }) {
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
                <div className={`priority-project-card__priority priority-project-card__priority-${item.prioritas.toLowerCase()}`}>
                  <p>{formatLabel(item.prioritas)}</p>
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