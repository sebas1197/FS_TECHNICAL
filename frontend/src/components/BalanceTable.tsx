import React from 'react';
import type { BalanceRecord } from '../types';


interface Props {
  data: BalanceRecord[];
}

export const BalanceTable: React.FC<Props> = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>DateTime</th><th>Group</th><th>Type</th><th>Value</th><th>%</th>
      </tr>
    </thead>
    <tbody>
      {data.map((r, i) => (
        <tr key={i}>
          <td>{new Date(r.datetime).toLocaleString()}</td>
          <td>{r.groupId}</td>
          <td>{r.type}</td>
          <td>{r.value.toFixed(2)}</td>
          <td>{(r.percentage*100).toFixed(1)}%</td>
        </tr>
      ))}
    </tbody>
  </table>
);
