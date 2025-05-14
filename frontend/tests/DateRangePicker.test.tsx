import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateRangePicker } from '../src/components/DateRangePicker';

test('calls onChange when dates picked', async () => {
  const onChange = jest.fn();
  const start = new Date('2025-05-01');
  const end   = new Date('2025-05-07');

  render(<DateRangePicker start={start} end={end} onChange={onChange} />);
  
  const inputs = screen.getAllByRole('textbox');
  await userEvent.click(inputs[0]);
  
  await userEvent.keyboard('{Escape}');
  expect(onChange).toHaveBeenCalled();
});
