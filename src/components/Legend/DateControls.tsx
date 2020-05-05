import React, { HTMLAttributes } from 'react';

import { ReactComponent as PauseIcon } from './pause.svg';
import { ReactComponent as PlayIcon } from './play.svg';

interface DateControlsProps extends HTMLAttributes<HTMLElement> {
  disabled: boolean;
  datesList: string[];
  selectedDate?: string;
  onChangeDate: (e: string) => void;
  animate: boolean;
  onChangeAnimate: (e: boolean) => void;
}

const DateControls: React.SFC<DateControlsProps> = ({
  disabled,
  datesList,
  selectedDate,
  onChangeDate,
  animate,
  onChangeAnimate,
}) => {
  const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    onChangeDate(e.target.value);
  const handleToggleAnimate = (): void => onChangeAnimate(!animate);

  return (
    <div className="legend-section">
      <label htmlFor="date" className="legend-section__date">
        Date
        <select
          id="date"
          value={selectedDate || ''}
          onChange={handleChangeDate}
          disabled={disabled || animate}
        >
          {datesList.map((date) => (
            <option key={`date-option-${date}`} value={date}>
              {date}
            </option>
          ))}
        </select>
      </label>
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
