import React from 'react';
import PropTypes from 'prop-types';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function DashboardActivityChart({ data = [] }) {
  const chartData = data.map((item) => {
    const start = new Date(`${item.week}T00:00:00Z`);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 6);
    const startDay = start.toLocaleDateString('id-ID', { day: 'numeric', timeZone: 'UTC' });
    const startMonth = start.toLocaleDateString('id-ID', { month: 'short', timeZone: 'UTC' });
    const endDay = end.toLocaleDateString('id-ID', { day: 'numeric', timeZone: 'UTC' });
    const endMonth = end.toLocaleDateString('id-ID', { month: 'short', timeZone: 'UTC' });
    return {
      ...item,
      label: startMonth === endMonth
        ? `${startDay}–${endDay} ${startMonth}`
        : `${startDay} ${startMonth}–${endDay} ${endMonth}`
    };
  });

  return (
    <section className="dashboard-extra-card">
      <h2>Aktivitas update mingguan</h2>
      <p>Jumlah catatan progress per minggu</p>
      <div className="dashboard-extra-card__chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ bottom: 12 }}>
            <CartesianGrid vertical={false} stroke="#E8EDF5" />
            <XAxis dataKey="label" interval={0} angle={-30} textAnchor="end" height={58} tickMargin={8} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="updates" name="Update" fill="#1b5fd6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

DashboardActivityChart.propTypes = { data: PropTypes.array };

export default DashboardActivityChart;
