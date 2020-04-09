const express = require('express');
const app = express();
const req = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const csv = require('csvtojson');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/covid', async (request, response, next) => {
  // TODO:
  // retrieve data from db
  // if lastUpdated date is < 24 hours old
  //    - return data
  // if lastUpdate date is > 24 hours old,
  //    - fetch new data from https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv
  //    - transform it, handle the "Geographic Exceptions"
  //    - overwrite old data in db
  //    - return data
  let transformedData = {
    data: {},
    maxCases: 0,
    maxDeaths: 0,
  };
  csv()
    .fromFile('./fullData.csv')
    .subscribe(
      (row) => {
        const { date, county, state, fips, cases, deaths } = row;
        if (!fips) return;
        if (!transformedData.data.hasOwnProperty(date)) {
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
      // TODO: actual error handling
      () => console.log('broke'),
      () => {
        response.json(transformedData);
      }
    );
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Server listening on ' + port + '...');
});
