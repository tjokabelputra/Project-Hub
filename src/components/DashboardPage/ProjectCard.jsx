import React from 'react';

function ProjectCard({ status, icon: Icon, title, content }) {
  return (
    <div className="project-card">
      <div className="project-card__header">
        <div className={`project-card__icon project-card__icon-${status.toLowerCase()}`}>
          {Icon && (
            <Icon
              className={`project-card__icon-image project-card__icon-image-${status.toLowerCase()}`}
            />
          )}
        </div>
        <p className="project-card__title">{title}</p>
      </div>
      <p>{content}</p>
    </div>
  );
}

export default ProjectCard;