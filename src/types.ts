export enum Variable {
    CASES = 'cases',
    DEATHS = 'deaths',
}

export type FipsStats = { [key in Variable]: number }

export type ResponseFipsDictionary = {
    [key: string]: { // date key
        [key: string]: FipsStats // fips # key
    }
}

export type ResponseData = { data: ResponseFipsDictionary, maxCases: number, maxDeaths: number }

export interface IFeature {
    id: string;
    properties: { [key: string]: string | number };
    state: FipsStats;
}

export type ColorScales = { [key in Variable]: (string | number)[] };

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