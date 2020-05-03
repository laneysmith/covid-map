import createFeatureIdentifier from '../createFeatureIdentifier';
import { Variable } from '../../types';

describe('createFeatureIdentifier', () => {
  it('should correctly build a FeatureIdentifier', () => {
    const fips = '12345';
    const source = 'counties-source';
    const expected = {
      source,
      sourceLayer: 'original',
      id: '12345',
    };

    expect(createFeatureIdentifier(fips, source)).toEqual(expected);
  });
});
