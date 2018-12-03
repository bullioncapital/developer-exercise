import path from 'path';
import Controller from './Controller';

describe('Controller', () => {
  const controller = new Controller(path.resolve(__dirname, './testData.csv'));

  test('initiate correctly', async () => {
    await controller.init();
    expect(controller.countries).not.toBeUndefined();
    expect(controller.startYear).toBe(1960);
    expect(controller.endYear).toBe(2017);
  });

  test('get the year with the highest average indicator value across all the countries', () => {
    expect(controller.getYearWithHighestValueOfIndicators('SP.POP.TOTL')).toEqual({year: 2017, averageValue: 105264})
  });

  test('get the country with the highest average indicator value within a period', () => {
    expect(controller.getCountryWithHighestAvgIndicatorInRangeOfYear('SP.POP.TOTL', 1989, 1999)).toEqual({name: "Aruba"})
  });
});
