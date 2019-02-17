import { ICsvDataRange } from "./commonInterface";

/**
 * This is a very simple deep clone, that will only work with primitives, use with caution!
 *
 * @export
 * @template T
 * @param {T} objectToClone pass in the object we want to clone
 * @returns {T}
 */
export function deepClone<T>(objectToClone: T): T {
  return JSON.parse(JSON.stringify(objectToClone)); // quick deep clone alternative
}

/**
 * This function takes in an array of values and then returns the average
 *
 * @param {number[]} values pass in array of values
 * @returns {number} returns an average value of the values passed in
 */
export function calculateAverageOfValues(values: number[]): number {
  return Number(
    (
      values.reduce(
        (previous: number, current: number) => previous + current, // add all the values up
        0
      ) / values.length
    ) // divide the added values buy the length/amount of values there were
      .toFixed(3) // return only 3 decimal places (most of the data in the csv is 3 decimals.)
  );
}

/**
 * This functions will take the indicatorValue and find all the rows that have it in its object and return them.
 *
 * @param indicatorValue pass in a string that will be used to check against the countriesData rows
 * @param countriesData The data we would to search through
 * @returns {ICsvDataRange[]} Return an array of the row data. The objects indicatorName should match with the indicator value passed in
 */
export function getDataByIndicatorName(
  indicatorValue: string,
  countriesData: ICsvDataRange[]
): ICsvDataRange[] {
  let countriesDataClone: ICsvDataRange[] = deepClone(countriesData);
  return countriesDataClone.filter((row: ICsvDataRange) => {
    return row.indicatorName === indicatorValue;
  });
}
