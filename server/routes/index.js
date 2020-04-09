const express = require('express');
const csv = require('csvtojson');
// const req = require('request');

const router = express.Router();

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

        if (!fips) {
          // Strip out any rows without a FIPS code, as they can't be mapped
          // to a county. This also takes care of the "geographic exceptions"
          // mentioned in the source data (https://github.com/nytimes/covid-19-data)
          // and prevents them from misrepresenting the min/max values.
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

        transformedData.data[date][fips] = { cases: casesInt, deaths: deathsInt };
      },
      next,
      () => {
        response.json(transformedData);
      }
    );
});

module.exports = router;
