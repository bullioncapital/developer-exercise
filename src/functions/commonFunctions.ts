import { ICsvDataRange } from "./commonInterface";
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
  let countriesDataClone: ICsvDataRange[] = JSON.parse(
    JSON.stringify(countriesData)
  ); // quick deep clone alternative

  return countriesDataClone.filter((row: ICsvDataRange) => {
    return row.indicatorName === indicatorValue;
  });
}
