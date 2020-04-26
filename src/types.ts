export const COLORS = [
    '#DEEDCF',
    '#B8DEAA',
    '#88CE86',
    '#62BE73',
    '#3FAC6C',
    '#1D9A6C',
    '#188977',
    '#137177',
    '#0E4D64',
    '#0A2F51',
];

export enum Variable {
    CASES = 'cases',
    DEATHS = 'deaths',
}

export type ColorScales = { [key in Variable]: [] };

export type FipsStats = { [key in Variable]: number }

export type ResponseData = { data: object, maxCases: number, maxDeaths: number }
