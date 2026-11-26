import React from 'react';
import PropTypes from 'prop-types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const STAGE_CONFIG = [
  {
    stage: 'PRA_KOMITE',
    name: 'Pra Komite'
  },
  {
    stage: 'KOMITE_TI_B',
    name: 'Komite TI B'
  },
  {
    stage: 'KOMITE_TI_A',
    name: 'Komite TI A'
  }
];

function ProjectStepChart({ stageCounts }) {
  const chartData = STAGE_CONFIG.map((item) => ({
    stage: item.name,
    planned: stageCounts?.[item.stage]?.PLANNED ?? 0,
    progress: stageCounts?.[item.stage]?.ON_PROGRESS ?? 0,
    completed: stageCounts?.[item.stage]?.SELESAI ?? 0
  }));

  return (
    <div className="project-stage-chart">
      <p className="project-stage-chart__title">Tahapan Komite</p>

      <div className="project-stage-chart__content">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} stroke="#E8EDF5" />

            <XAxis
              dataKey="stage"
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              domain={[0, 'auto']}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
            />

            <Bar
              dataKey="planned"
              name="Planned"
              stackId="status"
              fill="#D97706FF"
              barSize={40}
            />

            <Bar
              dataKey="progress"
              name="On Progress"
              stackId="status"
              fill="#198754"
            />

            <Bar
              dataKey="completed"
              name="Completed"
              stackId="status"
              fill="#2563EB"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

ProjectStepChart.propTypes = {
  stageCounts: PropTypes.object.isRequired
};

export default ProjectStepChart;
