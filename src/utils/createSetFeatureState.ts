import { FipsStats, Variable } from '../types';

/**
 * Outputs feature state for the setFeatureState method
 * @param fipsStats - object with counts for cases & deaths
 */
const createSetFeatureState = (fipsStats: FipsStats): { [key: string]: number } => {
  const cases = (fipsStats && fipsStats[Variable.CASES]) || 0;
  const deaths = (fipsStats && fipsStats[Variable.DEATHS]) || 0;
  return { cases, deaths };
};

export default createSetFeatureState;
