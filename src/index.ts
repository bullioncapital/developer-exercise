// import app from "./App";
import { parseCsvFile, parseJsonAsObject } from "./functions/csvParser";
import {
  getDataBetweenDates,
  removeCountriesWithMissingData,
  getHighestAverageData,
  getAverageDataForEachCountry
} from "./functions/2aFunctions";
import { ICsvDataRange } from "./functions/commonInterface";
import {
  combineDatesWithValues,
  deleteMissingValueFields,
  getDateAveragesAcrossCountries,
  getHighestDateAverage
} from "./functions/2bFunctions";
import { getDataByIndicatorName } from "./functions/commonFunctions";
const express = require("express");
const app = express();
const port = 3000;

/**
 *  2a. The country with the highest average "Urban population growth (annual %)"
 *      between 1980 and 1990. Exclude countries where any data entry for this time range is missing.
 *  Important Assumptions:- I have assumed that because it says `between these dates`, that if it asks
 *                          for between 1980 to 1990, that I would get the data for years
 *                          1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989 and NOT 1990.
 *  Accessible from`localhost:3000/2a` to see the results
 */
parseCsvFile("./data.csv", 4)
  .then(parseJsonAsObject)
  .then((data: ICsvDataRange[]) =>
    getDataByIndicatorName("Urban population growth (annual %)", data)
  )
  .then((data: ICsvDataRange[]) => getDataBetweenDates(1980, 1990, data))
  .then(removeCountriesWithMissingData)
  .then(getAverageDataForEachCountry)
  .then(getHighestAverageData)
  .then(data =>
    app.get("/2a", (req, res) =>
      res.send(
        `<div style="display: flex;flex-direction:column;justify-content: center;margin: auto;height: 100vh;align-items: center;">
          <div style="font-size: 22px;"> The country with the highest average Urban population growth (annual %) between 1980 to 1990 was ${
            data.countryName
          }. The annual percentage came in at ${data.average}%
          </div>
          <div style="display: flex;margin: 5rem;"> <button style="margin: auto;height: 42px;" onclick="location.href='/'" type="button">Go Back</button></div>
        </div>`
      )
    )
  );

/**
 *  2b. The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
 *  Important Assumptions:- I have assumed that even if there is no data for a country on a date
 *                          column that we just remove it and still average the other countries
 *                          values for that date.
 *  Accessible from`localhost:3000/2b` to see the results
 */
parseCsvFile("./data.csv", 4)
  .then(parseJsonAsObject)
  .then((data: ICsvDataRange[]) =>
    getDataByIndicatorName("CO2 emissions (kt)", data)
  )
  .then(combineDatesWithValues)
  .then(deleteMissingValueFields)
  .then(getDateAveragesAcrossCountries)
  .then(getHighestDateAverage)
  .then(data =>
    app.get("/2b", (req, res) =>
      res.send(
        `<div style="display: flex;flex-direction:column;justify-content: center;margin: auto;height: 100vh;align-items: center;">
          <div style="font-size: 22px;"> 
            The year with the highest average CO2 Emissions (kt) was ${
              data.date
            }. The value came in at a whopping ${data.average} (kt)
          </div>
          <div style="display: flex;margin: 5rem;"> <button style="margin: auto;height: 42px;" onclick="location.href='/'" type="button">Go Back</button></div>
        </div>`
      )
    )
  );

app.get("/", (req, res) =>
  res.send(
    `<div style="display: flex;justify-content: center;margin: auto;height: 100vh;align-items: center;">
      <button style="margin:10rem;height: 42px" onclick="location.href='/2a'" type="button">Result for 2a</button>
      <button style="margin:10rem;height: 42px" onclick="location.href='/2b'" type="button">Result for 2b</button>
    </div>`
  )
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
