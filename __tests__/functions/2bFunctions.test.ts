/**
 * @jest-environment node
 */
import { ICsvDataRange } from "../../src/functions/commonInterface";
import {
  getDateAveragesAcrossCountries,
  getHighestDateAverage,
  combineDatesWithValues,
  deleteMissingValueFields
} from "../../src/functions/2bFunctions";
import { IDateAndValues } from "../../src/functions/2bFunctionsInterface";
const data: ICsvDataRange = {
  dataToBeObserved: [
    { date: 1960, value: 50.776 },
    { date: 1961, value: 50.761 },
    { date: 1962, value: 50.362 },
    { date: 1963, value: 50.73 }
  ],
  countryName: "Aruba",
  countryCode: "ABW",
  indicatorName: "Urban population (% of total)",
  indicatorCode: "SP.URB.TOTL.IN.ZS"
};
const data1: ICsvDataRange = {
  dataToBeObserved: [
    { date: 1960, value: 50.38 },
    { date: 1961, value: 50.89 },
    { date: 1962, value: 50.287 },
    { date: 1963, value: 50.72 }
  ],
  countryName: "Australia",
  countryCode: "AUS",
  indicatorName: "Urban population (% of total)",
  indicatorCode: "SP.URB.TOTL.IN.ZS"
};

const dateAndValues: IDateAndValues[] = [
  { date: 1901, values: [6, 4, 32, 6, 2] },
  { date: 1900, values: [6, 65, 6, 2, 64] }
];
describe("Testing 2bFunctions", () => {
  test("convertDataToRows - test 1", () => {
    expect(
      combineDatesWithValues([
        data,
        {
          dataToBeObserved: [
            { date: 1960, value: null },
            { date: 1961, value: 50.89 },
            { date: 1962, value: 50.287 },
            { date: 1963, value: 50.72 }
          ],
          countryName: "Australia",
          countryCode: "AUS",
          indicatorName: "Urban population (% of total)",
          indicatorCode: "SP.URB.TOTL.IN.ZS"
        }
      ])
    ).toEqual([
      { date: 1960, values: [50.776, null] },
      { date: 1961, values: [50.761, 50.89] },
      { date: 1962, values: [50.362, 50.287] },
      { date: 1963, values: [50.73, 50.72] }
    ]);
  });

  test("getDateAverages - test 1", () => {
    expect(getDateAveragesAcrossCountries(dateAndValues)).toEqual([
      { date: 1901, average: 10.0 },
      { date: 1900, average: 28.6 }
    ]);
  });

  test("getHighestDateAverage - test 1 ", () => {
    expect(
      getHighestDateAverage([
        { date: 1901, average: 10.0 },
        { date: 1900, average: 28.6 }
      ])
    ).toEqual({ date: 1900, average: 28.6 });
  });
  test("deleteMissingFieldsOfCountries - test 1 ", () => {
    expect(
      deleteMissingValueFields([
        { date: 1960, values: [50.776, 50.38] },
        { date: 1961, values: [50.761, 50.89] },
        { date: 1962, values: [50.362, 50.287] },
        { date: 1963, values: [50.73, 50.72] }
      ])
    ).toEqual([
      { date: 1960, values: [50.776, 50.38] },
      { date: 1961, values: [50.761, 50.89] },
      { date: 1962, values: [50.362, 50.287] },
      { date: 1963, values: [50.73, 50.72] }
    ]);
  });
  test("deleteMissingFieldsOfCountries - test 2 ", () => {
    expect(
      deleteMissingValueFields([
        { date: 1960, values: [50.776, null] },
        { date: 1961, values: [50.761, 50.89] },
        { date: 1962, values: [null, 50.287] },
        { date: 1963, values: [50.73, 50.72] }
      ])
    ).toEqual([
      { date: 1960, values: [50.776] },
      { date: 1961, values: [50.761, 50.89] },
      { date: 1962, values: [50.287] },
      { date: 1963, values: [50.73, 50.72] }
    ]);
  });
  test("deleteMissingFieldsOfCountries - test3 ", () => {
    expect(
      deleteMissingValueFields([
        { date: 1960, values: [null, null] },
        { date: 1961, values: [50.761, 50.89] }
      ])
    ).toEqual([
      { date: 1960, values: [] },
      { date: 1961, values: [50.761, 50.89] }
    ]);
  });
});
