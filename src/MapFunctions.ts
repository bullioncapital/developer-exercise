/**
 * Get the average value for a country between the specified years
 *
 * @param minYear
 * @param maxYear
 * @constructor
 */
export function MapAverageValueBetweenYears(minYear: number, maxYear: number) {
  return (record: any) => {
    let currentYear: number = minYear;
    let summation: number = 0;

    while (currentYear < maxYear) {
      summation += parseFloat(record[currentYear]);
      currentYear++;
    }

    return {
      country: record['Country Name'],
      value: summation / (maxYear - minYear),
    };
  };
}

/**
 * Map the key: value input to an object
 * ['1990', {x: 'a', y: 'b'} -> { year: '1990', x: 'a', y: 'b'}
 *
 * @param input
 * @constructor
 */
export function MapYearKVPairToObject(input: any) {
  return {
    year: input[0],
    ...input[1],
  };
}