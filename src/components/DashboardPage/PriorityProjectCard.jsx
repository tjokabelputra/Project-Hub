import React from 'react';

function PriorityProjectCard({ projects }) {
  const upcomingProjects = projects
    .filter((project) => project.status !== 'COMPLETED' && project.targetGoLive)
    .sort((a, b) => new Date(a.targetGoLive) - new Date(b.targetGoLive))
    .slice(0, 5);

  return (
    <div className="priority-project-card">
      <p className="priority-project-card__title">Project Prioritas</p>
      <div className="priority-project-card__content">
        { upcomingProjects.map((project) => (
          <div className="priority-project-card__info" key={project.id}>
            <p className="priority-project-card__name">{project.name}</p>
            <p className="priority-project-card__stage">
              {new Date(`${project.targetGoLive}T00:00:00`)
                .toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriorityProjectCard;