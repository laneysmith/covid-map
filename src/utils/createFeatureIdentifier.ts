import { FeatureIdentifier } from 'mapbox-gl';

/**
 * Given a fips # and map source, outputs the FeatureIdentifier
 * @param fips - fips #
 * @param source - map source name
 */
const createFeatureIdentifier = (fips: string, source: string): FeatureIdentifier => ({
  source,
  sourceLayer: 'original',
  id: fips,
});

export default createFeatureIdentifier;
