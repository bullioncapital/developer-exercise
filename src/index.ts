import express from 'express';
import './data.csv';
import path from 'path';
import bodyParser from 'body-parser';
import Controller from './Controller/Controller';
import JSONResponse from './Helper/JSONResponse';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ctrl = new Controller(path.join(__dirname, 'data.csv'));

ctrl.init().then(() => {
  app.get('/get-year-with-highest-value-of-indicator/:indicator', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (!req.params.indicator) {
      res.status(400).json(new JSONResponse().respondBadRequest('Need to provide indicator code'));
    }
    const result = ctrl.getYearWithHighestValueOfIndicators(req.params.indicator);
    if (result) {
      res.status(200).json(new JSONResponse().respondOk('', result));
    } else {
      res.status(400).json(new JSONResponse().respondBadRequest('Data not found'));
    }
  });

  app.get('/get-country-with-highest-avg-value-of-indicator-in-period/:indicator', (req, res) => {
    const startYear = req.query.start;
    const endYear = req.query.end;
    if (!req.params.indicator) {
      res.status(400).json(new JSONResponse().respondBadRequest('Need to provide indicator code'));
    }
    if (startYear && endYear) {
      res.setHeader('Content-Type', 'application/json');
      const result = ctrl.getCountryWithHighestAvgIndicatorInRangeOfYear(req.params.indicator, startYear, endYear);
      if (result) {
        res.status(200).json(new JSONResponse().respondOk('', result));
      } else {
        res.status(400).json(new JSONResponse().respondBadRequest('Data not found'));
      }
    } else {
      res.status(400).json(new JSONResponse().respondBadRequest('Need to provide start year and end year'));
    }
  });

  // EN.ATM.CO2E.KT
  app.listen(9999, () => {
    console.log('Example app listening on port 9999 ');
  });
});
