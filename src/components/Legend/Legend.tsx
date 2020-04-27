import React from 'react';

import { Variable, ColorScales } from '../../types';
import DateControls from './DateControls';
import VariableControls from './VariableControls';
import Scale from './Scale';
import './_legend-styles.css';

interface ILegend {
  loaded: boolean;
  colorScales: ColorScales;
  datesList: string[];
  selectedDate?: string;
  onChangeDate: (e: string) => void;
  animate: boolean;
  onChangeAnimate: (e: boolean) => void;
  selectedVariable: Variable;
  onChangeVariable: (value: Variable) => void;
}

const Legend: React.SFC<ILegend> = ({
  loaded,
  colorScales,
  datesList,
  animate,
  selectedVariable,
  selectedDate,
  onChangeAnimate,
  onChangeVariable,
  onChangeDate,
}) => (
  <div id="state-legend" className="legend">
    <DateControls
      disabled={!loaded}
      datesList={datesList}
      selectedDate={selectedDate}
      onChangeDate={onChangeDate}
      animate={animate}
      onChangeAnimate={onChangeAnimate}
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
