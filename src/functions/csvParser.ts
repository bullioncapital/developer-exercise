import { ICsvRowData, ICsvDataRange } from "./commonInterface";
const fs = require("fs");
const csv = require("csv-parser");

/**
 * This function will return an array fo the csv data that is strongly typed.
 *
 * @export
 * @param {string} filePath should point to the csv file local to your project
 * @param {number} skipStartingLines used to skip over the un-needed data in the csv. If you don't have this you will get errors
 * @returns {Promise<ICsvRowData[]>}
 */
export function parseCsvFile(
  filePath: string,
  skipStartingLines: number
): Promise<ICsvRowData[]> {
  return new Promise((resolve, reject) => {
    let results: ICsvRowData[] = [];
    return fs
      .createReadStream(filePath)
      .pipe(csv({ skipLines: skipStartingLines })) //skip 4so we don't have errors with the title and name etc. This is hard coded. Could have a user input of how many rows to skip
      .on("data", data => results.push(data)) // add the data to the results array
      .on("end", () => {
        resolve(results); // resolve the promise
      })
      .on("error", err => {
        reject(err); //catch promise error
      });
  });
}
/**
 * This function grabs in the json that was built by our parsing function and converts it to an object that we can correctly interface with
 *
 * @param countriesOriginalData json representation of the original data
 * @returns {ICsvDataRange[]} return a better formated object of the passed in json
 */
export function parseJsonAsObject(
  countriesOriginalData: ICsvRowData[]
): ICsvDataRange[] {
  let countriesOriginalDataClone: ICsvRowData[] = JSON.parse(
    JSON.stringify(countriesOriginalData)
  ); // quick deep clone alternative
  return countriesOriginalDataClone.map((countryOriginalData: ICsvRowData) => {
    // build and return object
    return {
      countryCode: countryOriginalData["Country Code"],
      countryName: countryOriginalData["Country Name"],
      indicatorCode: countryOriginalData["Indicator Code"],
      indicatorName: countryOriginalData["Indicator Name"],
      dataToBeObserved: Object.entries(countryOriginalData)
        .reverse() // reverse it so that I can remove non-dates
        .slice(4) // return an object of dates only
        .map(([date, val]: [string, string]) => {
          return {
            date: Number(date),
            value: Number(val === "" ? null : val) // having null will help us determine where no data values are
          };
        })
        .reverse() // reverse it to get it back into its original form
    };
  });
}
