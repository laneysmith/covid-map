const NYC_EXCEPTION_NOTE =
  'Data for New York, Kings, Queens, Bronx and Richmond counties were reported in aggregate.';
const ALAMEDA_EXCEPTION_NOTE =
  'Counts for Alameda County include cases and deaths from Berkeley and the Grand Princess cruise ship.';
const DOUGLAS_EXCEPTION_NOTE =
  'Counts for Douglas County include cases brought to the state from the Diamond Princess cruise ship.';

export const EXCEPTIONS: Map<string, string> = new Map([
  ['36005', NYC_EXCEPTION_NOTE], // Bronx County
  ['36047', NYC_EXCEPTION_NOTE], // Kings County
  ['36061', NYC_EXCEPTION_NOTE], // New York County
  ['36081', NYC_EXCEPTION_NOTE], // Queens County
  ['36085', NYC_EXCEPTION_NOTE], // Richmond County
  ['06001', ALAMEDA_EXCEPTION_NOTE], // Alameda County, CA
  ['31055', DOUGLAS_EXCEPTION_NOTE], // Douglas County, NE
]);