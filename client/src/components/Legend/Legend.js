import React from 'react';

import AnimationControls from './AnimationControls';
import DateControls from './DateControls';
import VariableControls from './VariableControls';
import Scale from './Scale';
import './_legend-styles.css';

const Legend = ({
  loaded,
  colorScales,
  allDates,
  animate,
  selectedVariable,
  selectedDate,
  onChangeAnimate,
  onChangeVariable,
  onChangeDate,
}) => (
  <div id="state-legend" className="legend">
    <AnimationControls disabled={!loaded} animate={animate} onChangeAnimate={onChangeAnimate} />
    <DateControls
      disabled={!loaded || animate}
      allDates={allDates}
      selectedDate={selectedDate}
      onChangeDate={onChangeDate}
    />
    <VariableControls
      disabled={!loaded || animate}
      onChangeVariable={onChangeVariable}
      selectedVariable={selectedVariable}
    />
    <Scale colorScales={colorScales} selectedVariable={selectedVariable} />
  </div>
);

export default Legend;
