import { render, screen } from '@testing-library/react';
import { BalanceChart } from '../src/components/BalanceChart';


const sample = [
  { datetime: '2025-05-01T00:00:00Z', groupId:'A', type:'T', value:10, percentage:0.5 },
  { datetime: '2025-05-01T00:00:00Z', groupId:'B', type:'T', value:15, percentage:0.75 },
];

test('renders area chart with aggregated data', () => {
  render(<BalanceChart data={sample} />);
  expect(screen.getByText(/Total Balance/i)).toBeInTheDocument();
});
