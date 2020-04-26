import createSetFeatureStateArgs from '../createSetFeatureStateArgs';
import { Variable } from '../../types';

describe('createSetFeatureStateArgs', () => {
  it('should return the correct setFeatureState arguments', () => {
    const fips = '12345';
    const detail = {
      [Variable.CASES]: 7,
      [Variable.DEATHS]: 1,
    };
    const source = 'counties-source';
    const expected = [
      {
        source,
        sourceLayer: 'original',
        id: '12345',
      },
      {
        cases: 7,
        deaths: 1,
      },
    ];

    expect(createSetFeatureStateArgs('12345', detail, source)).toEqual(expected);
  });
});
