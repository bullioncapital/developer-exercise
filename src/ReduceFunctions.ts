/**
 * Reduce an array of objects to the value with the highest
 * specified field (representing an object key)
 *
 * @param field
 * @constructor
 */
export function ReduceMaxValue(field: string) {
  return (max, current) => {
    return current[field] > max[field] ? current : max;
  };
}

/**
 * Reduce an array of objects to the total value for each of the
 * available columns (object keys)
 *
 * @param max
 * @param current
 * @constructor
 */
export function ReduceYearSum(max, current) {
  const keys: string[] = Object.keys(current);
  const newMax: any = {};

  keys.forEach((key: string) => {
    if (!isNaN(parseInt(key, 10))) {
      if (!newMax[key]) {
        newMax[key] = {
          sum: 0,
          count: 0,
          average: 0,
        };
      }

      if (current[key]) {
        newMax[key]['sum'] += parseFloat(current[key]);
        newMax[key]['count'] += max[key]['count'] + 1;
        newMax[key]['average'] += newMax[key]['sum'] / newMax[key]['count'];
      }
    }
  });

  return newMax;
}