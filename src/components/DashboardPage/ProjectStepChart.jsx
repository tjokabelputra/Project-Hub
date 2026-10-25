import React from 'react';
import PropTypes from 'prop-types';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const stages = [
  { key: 'preCommittee', name: 'Pra Komite' },
  { key: 'committeeTIB', name: 'Komite TI B' },
  { key: 'committeeTIA', name: 'Komite TI A' },
];

function ProjectStepChart({ projects }) {
  const chartData = [
    { stage: 'Inisiasi', progress: 0, completed: 0, onHold: 0 },
    ...stages.map(({ name }) => ({
      stage: name,
      progress: 0,
      completed: 0,
      onHold: 0,
    })),
    { stage: 'Completed', progress: 0, completed: 0, onHold: 0 },
  ];

  projects.forEach((project) => {
    const allStagesCompleted = stages.every(
      ({ key }) => project[key]?.status === 'Completed',
    );

    const activeStage = [...stages]
      .reverse()
      .find(({ key }) => project[key]?.status === 'On Progress');

    const stageName = allStagesCompleted
      ? 'Completed'
      : activeStage?.name ?? 'Inisiasi';

    const stageData = chartData.find(
      (item) => item.stage === stageName,
    );

    if (project.status === 'On Progress') {
      stageData.progress += 1;
    } else if (project.status === 'Completed') {
      stageData.completed += 1;
    } else if (project.status === 'On Hold') {
      stageData.onHold += 1;
    }
  });

  return (
    <div className="project-stage-chart">
      <p className="project-stage-chart__title">Tahapan Komite</p>

      <div className="project-stage-chart__content">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} stroke="#E8EDF5"/>
            <XAxis
              dataKey="stage"
              tickLine={false}/>
            <YAxis
              allowDecimals={false}
              domain={[0, 'auto']}
              axisLine={false}
              tickLine={false}/>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"/>
            <Bar
              dataKey="progress"
              name="On Progress"
              stackId="status"
              fill="#198754"
              radius={[4, 4, 0, 0]}
              barSize={40}/>
            <Bar
              dataKey="completed"
              name="Completed"
              stackId="status"
              radius={[4, 4, 0, 0]}
              fill="#2563EB"/>
            <Bar
              dataKey="onHold"
              name="On Hold"
              stackId="status" fill="#DC3545"
              radius={[4, 4, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

ProjectStepChart.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default ProjectStepChart;