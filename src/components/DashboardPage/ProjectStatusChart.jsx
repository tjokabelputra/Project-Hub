import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const STATUS_CONFIG = [
  {
    status: 'On Progress',
    name: 'On Progress',
    color: '#198754'
  },
  {
    status: 'Completed',
    name: 'Completed',
    color: '#2563EB'
  },
  {
    status: 'On Hold',
    name: 'On Hold',
    color: '#DC3545'
  }
];

function ProjectStatusChart({ projects }) {
  const statusData = STATUS_CONFIG.map((item) => ({
    ...item,
    value: projects.filter((project) => project.status === item.status).length,
  }));

  return (
    <div className="project-status-chart">
      <p className="project-status-chart__title">Status Project</p>

      <div className="project-status-chart__content">
        <div className="project-status-chart__donut">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData.filter((item) => item.value > 0)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="90%"
                paddingAngle={0}
                stroke="none">
                {statusData
                  .filter((item) => item.value > 0)
                  .map((item) => (
                    <Cell
                      key={item.status}
                      fill={item.color}
                    />
                  ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="project-status-chart__center">
            <p className="project-status-chart__center-count">{projects.length}</p>
            <p className="project-status-chart__center-title">Projects</p>
          </div>
        </div>

        <div className="project-status-chart__legend">
          { statusData.map((item) => {
            return (
              <div key={item.status} className="project-status-chart__legend-item">
                <span className="project-status-chart__dot" style={{ backgroundColor: item.color }}/>
                <span className="project-status-chart__name">{item.name}</span>
                <strong>{item.value}</strong>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

ProjectStatusChart.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default ProjectStatusChart;