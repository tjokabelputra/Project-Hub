import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaFolder, FaRegClock, FaCheck, FaRegPauseCircle } from 'react-icons/fa';
import ProjectCard from '../components/DashboardPage/ProjectCard.jsx';
import ProjectStatusChart from '../components/DashboardPage/ProjectStatusChart.jsx';
import ProjectStepChart from '../components/DashboardPage/ProjectStepChart.jsx';
import PriorityProjectCard from '../components/DashboardPage/PriorityProjectCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGenerateInsight, asyncGetLatestInsight } from '../states/insight/action.js';
import InsightComponent from '../components/DashboardPage/InsightComponent.jsx';
import { asyncGetDashboard } from '../states/dashboard/action.js';
import { MdOutlinePending } from 'react-icons/md';
import ProjectSearchComponent from '../components/DashboardPage/ProjectSearchComponent.jsx';
import { asyncGetPms } from '../states/pms/action.js';
import { asyncGetBps } from '../states/bps/action.js';
import { asyncGetUnits } from '../states/unit/action.js';
import { asyncGetEnums } from '../states/enums/action.js';
import { asyncGetProjects } from '../states/projects/action.js';
import StaleProjectComponent from "../components/DashboardPage/StaleProjectComponent.jsx";

function DashboardPage() {
  const dashboardData = useSelector((states) => states.dashboard);
  const insight = useSelector((states) => states.insight);
  const projectsState = useSelector((states) => states.projects);
  const enums = useSelector((states) => states.enums);
  const pms = useSelector((states) => states.pms);
  const bps = useSelector((states) => states.bps);
  const units = useSelector((states) => states.units);
  const dispatch = useDispatch();
  const projects = projectsState.data;
  const pagination = projectsState.pagination;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(asyncGetProjects(1, 10));
    dispatch(asyncGetDashboard());
    dispatch(asyncGetLatestInsight());
    dispatch(asyncGetEnums());
    dispatch(asyncGetPms());
    dispatch(asyncGetBps());
    dispatch(asyncGetUnits());
  }, [dispatch]);

  const projectCards = [
    {
      status: 'ALL',
      icon: FaFolder,
      title: 'Total Projects',
      content: dashboardData.totalProjects,
    },
    {
      status: 'On Progress',
      icon: FaRegClock,
      title: 'On Progress Projects',
      content: dashboardData.statusCounts?.ON_PROGRESS ?? 0,
    },
    {
      status: 'Pending',
      icon: MdOutlinePending,
      title: 'Pending Project',
      content: dashboardData.statusCounts?.PENDING ?? 0,
    },
    {
      status: 'On Hold',
      icon: FaRegPauseCircle,
      title: 'On Hold Projects',
      content: dashboardData.statusCounts?.ON_HOLD ?? 0,
    },
    {
      status: 'Completed',
      icon: FaCheck,
      title: 'Completed Projects',
      content: dashboardData.statusCounts?.SELESAI ?? 0,
    },
  ];

  const onGenerate = async () => {
    setIsLoading(true);

    try {
      await dispatch(asyncGenerateInsight());
    }
    catch (error) {
      console.error(error);
      alert(error.message || 'Gagal membuat. Silakan coba lagi.');
    }
    finally {
      setIsLoading(false);
    }
  };

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
          <ProjectStatusChart
            statusCounts={dashboardData.statusCounts}
            totalProjects={dashboardData.totalProjects}
          />
        </div>
        <div className="dashboard-page__chart-item dashboard-page__chart-item--wide">
          <ProjectStepChart
            stageCounts={dashboardData.stageCounts}
          />
        </div>
        <div className="dashboard-page__chart-item">
          <PriorityProjectCard priorities={dashboardData.priorities}/>
        </div>
      </div>
      <InsightComponent
        insight={insight}
        onGenerate={onGenerate}
        isLoading={isLoading} />
      <ProjectSearchComponent
        projects={projects}
        pagination={pagination}
        onPageChange={(page) => dispatch(asyncGetProjects(page))}
        enums={enums}
        pms={pms}
        bps={bps}
        units={units}/>
      <StaleProjectComponent
        staleProjects={dashboardData.staleProjects}/>
    </section>
  );
}

DashboardPage.propTypes = {
  projects: PropTypes.array.isRequired
};

export default DashboardPage;