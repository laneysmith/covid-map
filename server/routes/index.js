const express = require('express');
const csv = require('csvtojson');

const router = express.Router();

// New York City Exceptions
const BRONX_COUNTY = '36005';
const KINGS_COUNTY = '36047';
const NEW_YORK_COUNTY = '36061';
const QUEENS_COUNTY = '36081';
const RICHMOND_COUNTY = '36085';

router.get('/', async (request, response, next) => {
  // TODO:
  // retrieve data from db
  // if lastUpdated date is < 24 hours old
  //    - return data
  // if lastUpdate date is > 24 hours old,
  //    - fetch new data from https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv
  //    - transform it, handle the "Geographic Exceptions"
  //    - overwrite old data in db
  //    - return data
  // or something like that
  const transformedData = {
    data: {},
    maxCases: 0,
    maxDeaths: 0,
  };

  csv()
    .fromFile('./data.csv')
    .subscribe(
      (row) => {
        const { date, county, state, fips, cases, deaths } = row;

        if (!fips && county !== 'New York City') {
          // Strip out any rows without a FIPS code, as they can't be mapped
          // directly to a county.
          return;
        }

        if (!Object.prototype.hasOwnProperty.call(transformedData.data, date)) {
          transformedData.data[date] = {};
        }

        const casesInt = parseInt(cases, 10);
        const deathsInt = parseInt(deaths, 10);

        if (casesInt > transformedData.maxCases) {
          transformedData.maxCases = casesInt;
        }

        if (deathsInt > transformedData.maxDeaths) {
          transformedData.maxDeaths = deathsInt;
        }

        // TODO: figure out how to handle the other exceptions
        // https://github.com/nytimes/covid-19-data#geographic-exceptions
        // Handle geographic exception for New York City
        if (county === 'New York City') {
          const aggregate = { cases: casesInt, deaths: deathsInt };
          transformedData.data[date][BRONX_COUNTY] = aggregate;
          transformedData.data[date][KINGS_COUNTY] = aggregate;
          transformedData.data[date][NEW_YORK_COUNTY] = aggregate;
          transformedData.data[date][QUEENS_COUNTY] = aggregate;
          transformedData.data[date][RICHMOND_COUNTY] = aggregate;
        } else {
          transformedData.data[date][fips] = { cases: casesInt, deaths: deathsInt };
        }
      },
      next,
      () => {
        response.json(transformedData);
      }
    );
});

module.exports = router;
