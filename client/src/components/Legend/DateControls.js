import React from 'react';

const DateControls = ({ disabled, allDates, selectedDate, onChangeDate }) => {
  const handleChangeDate = (e) => onChangeDate(e.target.value);

  return (
    <div className="legend-section">
      <label htmlFor="date">Date</label>
      <select id="date" value={selectedDate || ''} onChange={handleChangeDate} disabled={disabled}>
        {allDates.map((date) => (
          <option key={`date-option-${date}`} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateControls;
