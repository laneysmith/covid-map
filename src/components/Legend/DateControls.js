import React from 'react';

import { ReactComponent as PauseIcon } from './pause.svg';
import { ReactComponent as PlayIcon } from './play.svg';

const DateControls = ({
  disabled,
  allDates,
  selectedDate,
  onChangeDate,
  animate,
  onChangeAnimate,
}) => {
  const handleChangeDate = (e) => onChangeDate(e.target.value);
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
      <button type="button" onClick={handleToggleAnimate} disabled={disabled}>
        {animate ? <PauseIcon className="animate-icon" /> : <PlayIcon className="animate-icon" />}
      </button>
    </div>
  );
};

export default DateControls;
