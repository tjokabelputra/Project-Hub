import React from 'react';
import PropTypes from 'prop-types';
import { FaFolder, FaRegClock, FaCheck, FaRegPauseCircle } from 'react-icons/fa';
import ProjectCard from '../components/DashboardPage/ProjectCard.jsx';
import ProjectStatusChart from '../components/DashboardPage/ProjectStatusChart.jsx';
import ProjectStepChart from '../components/DashboardPage/ProjectStepChart.jsx';
import PriorityProjectCard from '../components/DashboardPage/PriorityProjectCard.jsx';

function DashboardPage({ projects }) {
  const projectStats = {
    all: projects.length,
    onProgress: projects.filter((project) => project.status === 'ON_PROGRESS').length,
    completed: projects.filter((project) => project.status === 'COMPLETED').length,
    onHoldProjects: projects.filter((project) => project.status === 'ON_HOLD').length,
  };

  const projectCards = [
    {
      status: 'ALL',
      icon: FaFolder,
      title: 'Total Projects',
      content: projectStats.all,
    },
    {
      status: 'ON_PROGRESS',
      icon: FaRegClock,
      title: 'On Progress Projects',
      content: projectStats.onProgress,
    },
    {
      status: 'COMPLETED',
      icon: FaCheck,
      title: 'Completed Projects',
      content: projectStats.completed,
    },
    {
      status: 'ON_HOLD',
      icon: FaRegPauseCircle,
      title: 'On Hold Projects',
      content: projectStats.onHoldProjects,
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-page__header">
        <h1>Dashboard Monitoring</h1>
        <p>Ringkasan status project dan tahapan komite secara real-time.</p>
      </div>
      <div className="dashboard-page__project-status">
        {projectCards.map((card) => (
          <ProjectCard
            key={card.status}
            status={card.status}
            icon={card.icon}
            title={card.title}
            content={card.content}/>
        ))}
      </div>
      <div className="dashboard-page__chart-section">
        <div className="dashboard-page__chart-item">
          <ProjectStatusChart projects={projects} />
        </div>
        <div className="dashboard-page__chart-item dashboard-page__chart-item--wide">
          <ProjectStepChart projects={projects} />
        </div>
        <div className="dashboard-page__chart-item">
          <PriorityProjectCard projects={projects}/>
        </div>
      </div>
    </section>
  );
}

DashboardPage.propTypes = {
  projects: PropTypes.array.isRequired
};

export default DashboardPage;