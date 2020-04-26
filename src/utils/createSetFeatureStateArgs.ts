import { FipsStats, Variable } from '../types';

/**
 * Outputs the arguments for the setFeatureState method
 * @param fips - fips #
 * @param detail - object with counts for cases & deaths
 * @param source - map source name
 */
const createSetFeatureStateArgs = (fips: string, detail: FipsStats, source: string): object[] => {
    const cases = (detail && detail[Variable.CASES]) || 0;
    const deaths = (detail && detail[Variable.DEATHS]) || 0;
    return [
        {
            source,
            sourceLayer: 'original',
            id: fips,
        },
        {
            cases,
            deaths,
        },
    ];
};

export default createSetFeatureStateArgs;