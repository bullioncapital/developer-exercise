import { ICsvDataRange, IDateAndData } from "./commonInterface";
import { IDateAndValues, IDateAndAverage } from "./2bFunctionsInterface";
import { deepClone, calculateAverageOfValues } from "./commonFunctions";
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
  let countriesDataDateClone = deepClone(countriesDataDate);
  countriesDataDateClone.forEach((countryDataDate: ICsvDataRange) => {
    countryDataDate.dataToBeObserved.forEach((dateAndData: IDateAndData) => {
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
        // only come in if you haven't found data above
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
  let dateAndValuesDataClone: IDateAndValues[] = deepClone(dateAndValuesData);
  return dateAndValuesDataClone.map((data: IDateAndValues) => {
    // create an array of objects that each have a data and all the values associated with it
    return {
      date: data.date,
      values: data.values.filter((value: number) => value !== null) // remove data that is null (no data). As my readme said I'm nto getting rid of everything just the data(my assumption).
    };
  });
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
  let dateAndValuesDataClone: IDateAndValues[] = deepClone(dateAndValuesData);
  return dateAndValuesDataClone.map((dateAndValues: IDateAndValues) => {
    //return dates with there averages
    return {
      date: dateAndValues.date,
      average: calculateAverageOfValues(
        dateAndValues.values.map((value: number) => value) // get average of the values
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
  // if you call a reducer function with an empty array with no initial value it will crash
  if (dateAndAveragesData.length === 0) return undefined;
  let dateAndAveragesDataClone: IDateAndAverage[] = deepClone(
    dateAndAveragesData
  );
  if (dateAndAveragesDataClone.length === 0) return undefined;
  return dateAndAveragesDataClone.reduce(
    (previous: IDateAndAverage, current: IDateAndAverage) => {
      return previous.average > current.average ? previous : current; // keep the object that has the highest average
    }
  );
}
