import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../util/util.js';

function PriorityProjectCard({ projects }) {
  const upcomingProjects = projects
    .filter((project) => project.status !== 'Completed' && project.targetGoLive)
    .sort((a, b) => new Date(a.targetGoLive) - new Date(b.targetGoLive))
    .slice(0, 5);

  return (
    <div className="priority-project-card">
      <p className="priority-project-card__title">Project Prioritas</p>
      <div className="priority-project-card__content">
        { upcomingProjects.map((project) => (
          <div className="priority-project-card__info" key={project.id}>
            <p className="priority-project-card__name">{project.name}</p>
            <p className="priority-project-card__stage">{formatDate(project.targetGoLive)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

PriorityProjectCard.propTypes = {
  projects: PropTypes.array.isRequired
};

export default PriorityProjectCard;