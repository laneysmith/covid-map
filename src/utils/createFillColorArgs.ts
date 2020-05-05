import { FillPaint } from 'mapbox-gl';

import { Variable, ColorScales } from '../types';

/**
 * Outputs the 'paint.fill-color' expression for county polygons
 * based on the selected variable
 * @param selectedVariable - 'cases' or 'deaths'
 * @param colorScales
 */
export default function createFillColorArgs(selectedVariable: Variable, colorScales: ColorScales): FillPaint['fill-color'] {
    return [
        'case',
        ['==', ['feature-state', selectedVariable], null],
        'rgba(0,0,0,0.25)',
        ['==', ['feature-state', selectedVariable], 0],
        'rgba(0,0,0,0.25)',
        [
            'interpolate',
            ['linear'],
            ['feature-state', selectedVariable],
            ...colorScales[selectedVariable].flat(),
        ],
    ]
};
