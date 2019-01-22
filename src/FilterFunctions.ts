/**
 * Filter records by the specified indicator (using the Indicator Name column)
 *
 * @param indicator
 * @constructor
 */
export function FilterByIndicatorName(indicator: string): (record: any) => boolean {
  return (record: any): boolean => {
    return record['Indicator Name'] === indicator;
  };
}

/**
 * Filter records between the specified min and max years
 *
 * @param minYear
 * @param maxYear
 * @constructor
 */
export function FilterByYearRange(minYear: number, maxYear: number): (record: any) => boolean {
  return (record: any): boolean => {
    let currentYear: number = minYear;

    while (currentYear < maxYear) {
      if (!record[currentYear]) {
        return false;
      }
      currentYear++;
    }

    return true;
  };
}