import { ICountryAndAverage } from "./2aFunctionsInterface";
import { ICsvDataRange, IDateAndData } from "./commonInterface";
import { deepClone, calculateAverageOfValues } from "./commonFunctions";
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
  let dataClone: ICsvDataRange[] = deepClone(countriesData);
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
  let countriesDataClone: ICsvDataRange[] = deepClone(countriesData);
  return countriesDataClone.filter((countryData: ICsvDataRange) => {
    return countryData.dataToBeObserved.every(
      (data: IDateAndData) => data.value !== null
    ); // return the date but if any data.value is null don't return anything as we don't want to look at that country anymore
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
  let countriesDataClone: ICsvDataRange[] = deepClone(countriesData);
  return countriesDataClone.map((countryData: ICsvDataRange) => {
    let countryDataClone: ICsvDataRange = deepClone(countryData);
    delete countryDataClone.dataToBeObserved; // we don't need the observed data, this will be replaced with the average value
    return Object.assign(countryDataClone, {
      average: calculateAverageOfValues(
        countryData.dataToBeObserved.map((value: IDateAndData) => value.value)
      ) //create a new object with the averages added.
    });
  });
}

/**
 * This functions takes in an array of countries and averages and then sorts
 * through them to return the object with the highest averages
 * can return undefined if an empty array is passed in!
 * @param countriesAverages pass in an array of countries with their averages
 * @return {ICountryAndAverage} return the highest average with its country info
 */
export const getHighestAverageData = (
  countriesAverages: ICountryAndAverage[]
): ICountryAndAverage => {
  // if you call a reducer function with an empty array with no initial value it will crash
  if (countriesAverages.length === 0) return undefined;
  let countriesDataClone: ICountryAndAverage[] = deepClone(countriesAverages);
  return countriesDataClone.reduce(
    // if you cal this function with an empty error it will crash. there are no checks but usually I would add checks
    (previous: ICountryAndAverage, current: ICountryAndAverage) => {
      return previous.average > current.average ? previous : current; // keep the object that has the highest average
    }
  );
};
