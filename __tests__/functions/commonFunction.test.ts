/**
 * @jest-environment node
 */
import {
  getDataByIndicatorName,
  calculateAverageOfValues
} from "../../src/functions/commonFunctions";
import { ICsvDataRange } from "../../src/functions/commonInterface";
const data: ICsvDataRange = {
  dataToBeObserved: [
    { date: 1960, value: 50.776 },
    { date: 1961, value: 50.761 },
    { date: 1962, value: 50.362 },
    { date: 1963, value: 50.73 },
    { date: 1964, value: 50.715 },
    { date: 1965, value: 50.7 },
    { date: 1966, value: 50.685 },
    { date: 1967, value: 50.67 },
    { date: 1968, value: 50.654 },
    { date: 1969, value: 50.639 },
    { date: 1970, value: 50.624 },
    { date: 1971, value: 50.609 },
    { date: 1972, value: 50.593 },
    { date: 1973, value: 50.578 },
    { date: 1974, value: 50.563 },
    { date: 1975, value: 50.548 },
    { date: 1976, value: 50.532 },
    { date: 1977, value: 50.517 },
    { date: 1978, value: 50.502 },
    { date: 1979, value: 50.487 },
    { date: 1980, value: 50.472 },
    { date: 1981, value: 50.456 },
    { date: 1982, value: 50.441 },
    { date: 1983, value: 50.426 },
    { date: 1984, value: 50.411 },
    { date: 1985, value: 50.395 },
    { date: 1986, value: 50.38 },
    { date: 1987, value: 50.365 },
    { date: 1988, value: 50.35 },
    { date: 1989, value: 50.335 },
    { date: 1990, value: 50.319 },
    { date: 1991, value: 50.304 },
    { date: 1992, value: 49.998 },
    { date: 1993, value: 49.588 },
    { date: 1994, value: 49.177 },
    { date: 1995, value: 48.767 },
    { date: 1996, value: 48.356 },
    { date: 1997, value: 47.946 },
    { date: 1998, value: 47.536 },
    { date: 1999, value: 47.127 },
    { date: 2000, value: 46.717 },
    { date: 2001, value: 46.339 },
    { date: 2002, value: 45.972 },
    { date: 2003, value: 45.606 },
    { date: 2004, value: 45.24 },
    { date: 2005, value: 44.875 },
    { date: 2006, value: 44.511 },
    { date: 2007, value: 44.147 },
    { date: 2008, value: 43.783 },
    { date: 2009, value: 43.421 },
    { date: 2010, value: 43.059 },
    { date: 2011, value: 42.94 },
    { date: 2012, value: 42.957 },
    { date: 2013, value: 42.99 },
    { date: 2014, value: 43.041 },
    { date: 2015, value: 43.108 },
    { date: 2016, value: 43.192 },
    { date: 2017, value: 43.293 }
  ],
  countryName: "Aruba",
  countryCode: "ABW",
  indicatorName: "Urban population (% of total)",
  indicatorCode: "SP.URB.TOTL.IN.ZS"
};

const data2: ICsvDataRange = {
  dataToBeObserved: [
    { date: 1960, value: 50.776 },
    { date: 1961, value: 50.761 },
    { date: 1962, value: null },
    { date: 1963, value: null },
    { date: 1964, value: 50.715 },
    { date: 1965, value: 50.7 },
    { date: 1966, value: 50.685 },
    { date: 1967, value: 50.67 },
    { date: 1968, value: 50.654 },
    { date: 1969, value: 50.639 },
    { date: 1970, value: 50.624 },
    { date: 1971, value: 50.609 },
    { date: 1972, value: 50.593 },
    { date: 1973, value: 50.578 },
    { date: 1974, value: 50.563 },
    { date: 1975, value: 50.548 },
    { date: 1976, value: 50.532 },
    { date: 1977, value: 50.517 },
    { date: 1978, value: 50.502 },
    { date: 1979, value: 50.487 },
    { date: 1980, value: 50.472 },
    { date: 1981, value: 50.456 },
    { date: 1982, value: 50.441 },
    { date: 1983, value: 50.426 },
    { date: 1984, value: 50.411 },
    { date: 1985, value: 50.395 },
    { date: 1986, value: 50.38 },
    { date: 1987, value: 50.365 },
    { date: 1988, value: 50.35 },
    { date: 1989, value: 50.335 },
    { date: 1990, value: 50.319 },
    { date: 1991, value: 50.304 },
    { date: 1992, value: 49.998 },
    { date: 1993, value: 49.588 },
    { date: 1994, value: 48.177 },
    { date: 1995, value: 48.767 },
    { date: 1996, value: 48.356 },
    { date: 1997, value: 47.946 },
    { date: 1998, value: 47.536 },
    { date: 1999, value: 47.127 },
    { date: 2000, value: 46.717 },
    { date: 2001, value: 46.339 },
    { date: 2002, value: 45.972 },
    { date: 2003, value: 45.606 },
    { date: 2004, value: 45.24 },
    { date: 2005, value: 44.875 },
    { date: 2006, value: 44.511 },
    { date: 2007, value: 44.147 },
    { date: 2008, value: 43.783 },
    { date: 2009, value: 43.421 },
    { date: 2010, value: 43.059 },
    { date: 2011, value: 42.94 },
    { date: 2012, value: 42.957 },
    { date: 2013, value: 42.99 },
    { date: 2014, value: 43.041 },
    { date: 2015, value: 43.108 },
    { date: 2016, value: 43.192 },
    { date: 2017, value: 43.293 }
  ],
  countryName: "Australia",
  countryCode: "AUS",
  indicatorName: "CO2 emissions (kt)",
  indicatorCode: "SP.URB.TOTL.IN.ZS"
};
describe("Testing Functions.ts", () => {
  test("getDataByIndicatorName - test 1", () => {
    expect(getDataByIndicatorName("CO2 emissions (kt)", [data, data2])).toEqual(
      [data2]
    );
  });
  test("getDataByIndicatorName - test 2", () => {
    expect(getDataByIndicatorName("CO2 emissions (kt)", [data2])).toEqual([
      data2
    ]);
  });
  test("getDataByIndicatorName - test 3", () => {
    expect(getDataByIndicatorName("blah blah blah", [data, data2])).toEqual([]);
  });
  test("getDataByIndicatorName - test 4", () => {
    expect(getDataByIndicatorName("CO2 emissions (kt)", [])).toEqual([]);
  });
  test("getDataByIndicatorName - test 4", () => {
    expect(calculateAverageOfValues([6, 67, 87, 2, 8])).toEqual(34);
  });
});
