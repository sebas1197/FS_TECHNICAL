import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  start: Date;
  end: Date;
  onChange: (start: Date, end: Date) => void;
}

export const DateRangePicker: React.FC<Props> = ({ start, end, onChange }) => {
  return (
    <div className="date-range-picker">
      <DatePicker
        selected={start}
        selectsStart
        startDate={start}
        endDate={end}
        onChange={date => date && onChange(date, end)}
      />
      {' – '}
      <DatePicker
        selected={end}
        selectsEnd
        startDate={start}
        endDate={end}
        onChange={date => date && onChange(start, date)}
      />
    </div>
  );
};
