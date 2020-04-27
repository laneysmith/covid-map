import createSetFeatureState from '../createSetFeatureState';
import { Variable } from '../../types';

describe('createSetFeatureState', () => {
  it('should return the correct feature state argument for the setFeatureState method', () => {
    const detail1 = {
      [Variable.CASES]: 7,
      [Variable.DEATHS]: 1,
    };
    const expected1 = {
      cases: 7,
      deaths: 1,
    };

    const detail2 = {};
    const expected2 = {
      cases: 0,
      deaths: 0,
    };

    expect(createSetFeatureState(detail1)).toEqual(expected1);
    expect(createSetFeatureState(detail2)).toEqual(expected2);
  });
});
