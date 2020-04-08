const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
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
  const csvFilePath = './data.csv';
  const csv = require('csvtojson');
  const jsonArray = await csv().fromFile(csvFilePath);
  response.json(jsonArray);
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Server listening on ' + port + '...');
});
