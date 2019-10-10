import { readFileSync } from "fs";
import { findKey, forEach, mapValues, max, mean, values } from "lodash";
import { parse, ParseResult } from "papaparse";
import {
  IAvgCO2EmissionPerYear,
  IGetReportsResponse,
  IReportData,
  ISearchParams,
} from "./types";

const getReports = (): IGetReportsResponse => {
  const file = readFileSync("./data.csv", "utf8");
  const jsonData: ParseResult = parse(
    file,
    {
      complete: (result: ParseResult) => result,
      header: true,
      skipEmptyLines: true,
    },
  );

  const { data } = jsonData;

  const searchParams: ISearchParams = [
    {
      field: "Indicator Name",
      value: "Urban population growth (annual %)",
      minYear: 1980,
      maxYear: 1990,
      countryField: "Country Name",
    },
    {
      field: "Indicator Name",
      value: "CO2 emissions (kt)",
      minYear: 1960,
      maxYear: 2017,
      countryField: "Country Name",
    },
  ];

  const initialReportData: IReportData = {
    country: "",
    highestPopulationGrowth: 0,
    highestCO2EmissionData: {},
  };

  const reports = data
    .reduce((acc, row) => {

      // highest population growth report
      if (row[searchParams[0].field] === searchParams[0].value) {
        // initializing `total` and flag for all data existance
        let total = 0;
        let allData = true;

        // looping over each header column value for this `row`
        forEach(row, (val: any, key: any) => {
          // check if header column falls between required years
          if (
            key &&
            parseInt(key) >= searchParams[0].minYear &&
            parseInt(key) <= searchParams[0].maxYear
          ) {
            if (val) {
              total += parseFloat(val);
            } else {
              allData = false;
            }
          }
        });

        // 11 is gap between 1980 to 1990
        const currentAvg = total / 11;

        return (allData && acc.highestPopulationGrowth < currentAvg)
          ? {
              country: row[searchParams[0].countryField],
              highestPopulationGrowth: currentAvg,
              highestCO2EmissionData: acc.highestCO2EmissionData,
          }
          : acc;
      }

      // highest CO2 emission report
      if (row[searchParams[1].field] === searchParams[1].value) {
        // looping over each header column value for this `row`
        forEach(row, (val: any, key: any) => {
          // check if header column falls between required years
          if (
            key && val &&
            parseInt(key) >= searchParams[1].minYear &&
            parseInt(key) <= searchParams[1].maxYear
          ) {
            if (Object.keys(acc.highestCO2EmissionData).includes(key)) {
              acc.highestCO2EmissionData[key].push(parseFloat(val));
            } else {
              acc.highestCO2EmissionData[key] = [parseFloat(val)];
            }
          }
        });
      }

      return acc;
    }, initialReportData);

  const co2EmissionData = reports.highestCO2EmissionData;
  const avgCO2EmissionPerYear: IAvgCO2EmissionPerYear = mapValues(co2EmissionData, (data) => mean(data));
  const highestCO2EmissionInYear: string | undefined = findKey(avgCO2EmissionPerYear, (o) => o === max(values(avgCO2EmissionPerYear)));

  return {
    country: reports.country,
    year: highestCO2EmissionInYear,
  };
};

export default getReports;
