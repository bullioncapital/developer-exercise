import { ICsvDataRange, IDateAndData } from "./commonInterface";
import { IDateAndValues, IDateAndAverage } from "./2bFunctionsInterface";
/**
 * This function basically transposes the input so that the output has all the dates with their respective row values
 * This makes it easier for us to work with averaged over the dates column.
 *
 * @export
 * @param {ICsvDataRange[]} countriesDataDate pass in csv data range
 * @returns {IDateAndValues[]} returns a converted csv data to a readable date and values format
 */
export function combineDatesWithValues(
  countriesDataDate: ICsvDataRange[]
): IDateAndValues[] {
  const returningDateAndValues: IDateAndValues[] = []; // init  array
  let countriesDataDateClone: ICsvDataRange[] = JSON.parse(
    JSON.stringify(countriesDataDate)
  ); // quick deep clone alternative
  countriesDataDateClone.map((countryDataDate: ICsvDataRange) => {
    countryDataDate.dataToBeObserved.map((dateAndData: IDateAndData) => {
      var foundData: IDateAndValues = returningDateAndValues.find(
        (returnedDateAndValue: IDateAndValues) => {
          if (returnedDateAndValue.date === dateAndData.date) {
            //do the dates align up?
            returnedDateAndValue.values.push(dateAndData.value); //if the dates align push in the value to that date
            return true;
          }
        }
      );
      if (!foundData) {
        // only come in if you have found data above
        returningDateAndValues.push({
          date: dateAndData.date,
          values: [dateAndData.value]
        });
      }
    });
  });

  return returningDateAndValues;
}

/**
 * This function will go over the input array and check to see if any of the values associated with the date
 * is null and not add it in to the new array.
 *
 * @export
 * @param {IDateAndValues[]} dateAndValuesData pass in dates and values associated with their dates
 * @returns {IDateAndValues[]} return a dates and their values but with no null values
 */
export function deleteMissingValueFields(
  dateAndValuesData: IDateAndValues[]
): IDateAndValues[] {
  let dateAndValuesDataClone: IDateAndValues[] = JSON.parse(
    JSON.stringify(dateAndValuesData)
  ); // quick deep clone alternative
  let returnDateAndValuesData: IDateAndValues[] = [];
  dateAndValuesDataClone.forEach((data: IDateAndValues) => {
    // create an array of objects that each have a data and all the values associated with it
    returnDateAndValuesData.push({
      date: data.date,
      values: data.values.filter((value: number) => value !== null) // remove data that is null (no data). As my readme said I'm nto getting rid of everything just the data(my assumption).
    });
  });
  return returnDateAndValuesData;
}
/**
 * This function gets the dates that are passed in and then averages the
 * values that are linked with their respective dates.
 *
 * @export
 * @param {IDateAndValues[]} dateAndValuesData pass in all the dates with their values
 * @returns {IDateAndAverage[]} return and array of dates with their averages
 */
export function getDateAveragesAcrossCountries( //countries also means rows...
  dateAndValuesData: IDateAndValues[]
): IDateAndAverage[] {
  let dateAndValuesDataClone: IDateAndValues[] = JSON.parse(
    JSON.stringify(dateAndValuesData)
  ); // quick deep clone alternative

  return dateAndValuesDataClone.map((dateAndValues: IDateAndValues) => {
    //return dates with there averages
    return {
      date: dateAndValues.date,
      average: Number(
        (
          dateAndValues.values.reduce(
            (previous: number, value: number) => previous + value, // add all the values up
            0
          ) / dateAndValues.values.length
        ) // divide the added values buy the length/amount of values there were
          .toFixed(3) // return only 3 decimal places (most of the data in the csv is 3 decimals.)
      )
    };
  });
}
/**
 * This functions takes in an array of dates and averages and then sorts
 * through them to return the object with the highest averages
 * @param dateAndAveragesData pass in an array of dates with their averages
 * @returns {IDateAndAverage} return the highest average with its data
 */
export function getHighestDateAverage(
  dateAndAveragesData: IDateAndAverage[]
): IDateAndAverage {
  let dateAndAveragesDataClone: IDateAndAverage[] = JSON.parse(
    JSON.stringify(dateAndAveragesData)
  ); // quick deep clone alternative

  return dateAndAveragesDataClone.reduce(
    (previous: IDateAndAverage, current: IDateAndAverage) => {
      return previous.average > current.average ? previous : current; // keep the object that has the highest average
    }
  );
}
