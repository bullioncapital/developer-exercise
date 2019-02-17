import { ICountryAndAverage } from "./2aFunctionsInterface";
import { ICsvDataRange, IDateAndData } from "./commonInterface";
/**
 * This function takes in 2 dates, and the countries data. The Countries data is filtered by the dates and is returns.
 *
 *  Important Assumptions:- I have assumed that because it says `between these dates`, that if it asks
 *                          for between 1980 to 1990, that I would get the data for years
 *                          1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989 and `NOT 1990`.
 * I
 * @export
 * @param {number} startRange The start date to filter by. The data associated with this data will be included
 * @param {number} endRange The end date to filter by. This dates data will need be included.
 * @param {ICsvDataRange[]} countriesData pass in the data to be filtered
 * @returns {ICsvDataRange[]} returns countriesData filtered by input dates.
 */
export function getDataBetweenDates(
  startRange: number,
  endRange: number,
  countriesData: ICsvDataRange[]
): ICsvDataRange[] {
  let dataClone: ICsvDataRange[] = JSON.parse(JSON.stringify(countriesData)); // quick deep clone alternative
  dataClone.map((row: ICsvDataRange) => {
    // remove non needed dates
    row.dataToBeObserved = row.dataToBeObserved.filter(
      (value: IDateAndData) => {
        return value.date >= startRange && value.date < endRange; // make sure its between the specified dates (can equal the start date)
      }
    );
    return row;
  });
  return dataClone;
}

/**
 * This function takes in the countries data and then removes any country that has a value that is null.
 *
 * @export
 * @param {ICsvDataRange[]} countriesData pass in all the countries and their data
 * @returns {ICsvDataRange[]} returned the countries data with no nulls
 */
export function removeCountriesWithMissingData(
  countriesData: ICsvDataRange[]
): ICsvDataRange[] {
  let countriesDataClone: ICsvDataRange[] = JSON.parse(
    JSON.stringify(countriesData)
  ); // quick deep clone alternative

  return countriesDataClone.filter((countryData: ICsvDataRange) => {
    return !countryData.dataToBeObserved // `NOT` it, so that includes(false) is false and won't return the data.
      .map((data: IDateAndData) => {
        if (data.value === null) return false; //check to see if the value is false.
        return true;
      })
      .includes(false); // if there is a false value in the array it means there was no data on one of that dates.
  });
}
/**
 *This function take in the countriesData and returns a new array with average data added. Removing the original data.
 *
 * @export
 * @param {ICsvDataRange[]} countriesData pass in an array of all the countries and there information
 * @returns {ICountryAndAverage[]} // return countries and their values averaged
 */
export function getAverageDataForEachCountry(
  countriesData: ICsvDataRange[]
): ICountryAndAverage[] {
  let countriesDataClone: ICsvDataRange[] = JSON.parse(
    JSON.stringify(countriesData)
  ); // quick deep clone alternative

  return countriesDataClone.map((countryData: ICsvDataRange) => {
    let countryDataClone: ICsvDataRange = JSON.parse(
      JSON.stringify(countryData)
    ); // quick deep clone alternative
    delete countryDataClone.dataToBeObserved; // we don't need the observed data, this will be replaced with the average value
    return Object.assign(countryDataClone, {
      average: Number(
        (
          countryData.dataToBeObserved.reduce(
            (previous: number, current: IDateAndData) =>
              previous + current.value, // add all the values up
            0
          ) / countryData.dataToBeObserved.length
        ) // divide the added values buy the length/amount of values there were
          .toFixed(3) // return only 3 decimal places (most of the data in the csv is 3 decimals.)
      )
    });
  });
}
/**
 * This functions takes in an array of countries and averages and then sorts
 * through them to return the object with the highest averages
 * @param countriesAverages pass in an array of countries with their averages
 * @return {ICountryAndAverage} return the highest average with its country info
 */
export const getHighestAverageData = (
  countriesAverages: ICountryAndAverage[]
): ICountryAndAverage => {
  let countriesDataClone: ICountryAndAverage[] = JSON.parse(
    JSON.stringify(countriesAverages)
  ); // quick deep clone alternative

  return countriesDataClone.reduce(
    (previous: ICountryAndAverage, current: ICountryAndAverage) => {
      return previous.average > current.average ? previous : current; // keep the object that has the highest average
    }
  );
};
