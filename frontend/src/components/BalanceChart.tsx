import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import type { BalanceRecord } from '../types';


interface Props {
  data: BalanceRecord[];
}

export const BalanceChart: React.FC<Props> = ({ data }) => {
  const aggregated = data.reduce<Record<string, number>>((acc, rec) => {
    const date = rec.datetime.slice(0, 10);
    acc[date] = (acc[date] || 0) + rec.value;
    return acc;
  }, {});

  const chartData = Object.entries(aggregated).map(([date, value]) => ({ date, value }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="value" name="Total Balance" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
