export enum Variable {
  CASES = 'cases',
  DEATHS = 'deaths',
}

export type FipsStats = { [key in Variable]: number };

export type ResponseFipsDictionary = {
  // date key
  [key: string]: {
    [key: string]: FipsStats; // fips # key
  };
};

export type ResponseData = { data: ResponseFipsDictionary; maxCases: number; maxDeaths: number };

export interface Feature {
  id: string;
  properties: { [key: string]: string | number };
  state: FipsStats;
}

export type ColorScales = { [key in Variable]: (string | number)[][] };

export const COLORS = [
  '#ffffc0',
  '#f7e371',
  '#edc552',
  '#e3a64f',
  '#d8864b',
  '#cd6548',
  '#c13f44',
  '#a22b38',
  '#7f1f2a',
  '#5d141c',
];
