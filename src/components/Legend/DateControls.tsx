import React from 'react';

import { ReactComponent as PauseIcon } from './pause.svg';
import { ReactComponent as PlayIcon } from './play.svg';

interface IDateControls {
  disabled: boolean;
  allDates: string[];
  selectedDate?: string;
  onChangeDate: (e: string) => void;
  animate: boolean;
  onChangeAnimate: (e: boolean) => void;
}

const DateControls: React.SFC<IDateControls> = ({
  disabled,
  allDates,
  selectedDate,
  onChangeDate,
  animate,
  onChangeAnimate,
}) => {
  const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    onChangeDate(e.target.value);
  const handleToggleAnimate = () => onChangeAnimate(!animate);

  return (
    <div className="legend-section">
      <label htmlFor="date">Date</label>
      <select
        id="date"
        value={selectedDate || ''}
        onChange={handleChangeDate}
        disabled={disabled || animate}
      >
        {allDates.map((date) => (
          <option key={`date-option-${date}`} value={date}>
            {date}
          </option>
        ))}
      </select>
      <button
        id="animate-toggle-button"
        type="button"
        onClick={handleToggleAnimate}
        disabled={disabled}
      >
        {animate ? <PauseIcon className="animate-icon" /> : <PlayIcon className="animate-icon" />}
      </button>
    </div>
  );
};

export default DateControls;
