import csvParser from "csv-parser";
import * as fs from "fs";

enum Indexes {
  minimumYearIndex = 4,
  maximumIndicatorIndex = 62,
  indicatorCode = 3,
  eightyIndex = 24,
  nightyIndex = 34,
  metaDataIndex = 3
}
enum IndicatorCode {
  annualUrbanPopulationGrowth = "SP.URB.GROW",
  highestCO2EmissionsK2 = "EN.ATM.CO2E.KT"
}

type Data = {
  [key: number]: string | undefined;
};
const urbanGrowthAverages: number[] = [];
const data: Data[] = [];
const co2EmissionCounts: Data = {};
for (let i = Indexes.minimumYearIndex; i <= Indexes.maximumIndicatorIndex; i++)
  co2EmissionCounts[i] = "0";

const checkIfDataExistsForTimeRange = (row: Data): boolean => {
  for (let i = Indexes.eightyIndex; i <= Indexes.nightyIndex; i++)
    if (row[i] === "" || row[i] === null) return false;
  return true;
};

const filterData = (row: Data, index: number, code: string): boolean => {
  if (index > Indexes.indicatorCode && row[Indexes.indicatorCode] === code)
    return true;
  return false;
};

const calculateUrbanGrowthAverages = (item: Data): void => {
  let total = 0;
  for (let i = Indexes.eightyIndex; i <= Indexes.nightyIndex; i++)
    total = total + +item[i]!;
  urbanGrowthAverages.push(total / 10);
};

const crossAggregator = (previousValue: Data, currentValue: Data): Data => {
  const output: Data = {};
  for (
    let i = Indexes.minimumYearIndex;
    i <= Indexes.maximumIndicatorIndex;
    i++
  )
    output[i] = (+currentValue[i]! + +previousValue[i]!).toString();

  return output;
};

const crossAggregationCounter = (
  _previousValue: Data,
  currentValue: Data,
  _index: number
): Data => {
  for (
    let i = Indexes.minimumYearIndex;
    i <= Indexes.maximumIndicatorIndex;
    i++
  ) {
    if (!(currentValue[i] === "" || currentValue[i] === null))
      co2EmissionCounts[i] = (+co2EmissionCounts[i]! + 1).toString();
  }
  return currentValue;
};

// Parse the CSV into Json
fs.createReadStream("data.csv")
  .pipe(csvParser())
  .on("data", row => data.push(row))
  .on("end", () => {
    // Calculate output
    console.log(
      "\nComputing highest highest average 'Urban population growth (annual %)' between 1980 and 1990"
    );
    const annualUrbanGrowth = data
      .filter((row, index) =>
        filterData(row, index, IndicatorCode.annualUrbanPopulationGrowth)
      )
      .filter(checkIfDataExistsForTimeRange);
    annualUrbanGrowth.forEach(calculateUrbanGrowthAverages);

    const highestUrbanGrowthAverage = Math.max(...urbanGrowthAverages);
    const countryHighestUrbanGrwothAvg =
      annualUrbanGrowth[
        urbanGrowthAverages.indexOf(highestUrbanGrowthAverage)
      ][0];

    console.log(
      `\nCountry: ${countryHighestUrbanGrwothAvg}\nHighest Average Value: ${highestUrbanGrowthAverage.toFixed(
        4
      )}`
    );

    console.log(
      "\nComputing The year with the highest 'CO2 emissions (kt)', averaged across each country for which data is available."
    );
    const co2EmissionYears = data.filter((row, index) =>
      filterData(row, index, IndicatorCode.highestCO2EmissionsK2)
    );

    const co2EmissionAverages: number[] = [];

    const co2EmissionTotals = co2EmissionYears.reduce(crossAggregator);

    co2EmissionYears.reduce(crossAggregationCounter);

    for (
      let i = Indexes.minimumYearIndex;
      i <= Indexes.maximumIndicatorIndex;
      i++
    ) {
      if (+co2EmissionTotals[i]! !== 0 && +co2EmissionCounts[i]! !== 0)
        co2EmissionAverages.push(
          +co2EmissionTotals[i]! / +co2EmissionCounts[i]!
        );
    }

    const highestAverageCO2Emision = Math.max(...co2EmissionAverages);
    const highestAverageCO2EmissionYear =
      data[Indexes.metaDataIndex][
        co2EmissionAverages.indexOf(highestAverageCO2Emision) +
          Indexes.minimumYearIndex
      ];
    console.log(
      `\nYear: ${highestAverageCO2EmissionYear}\nHighest Average CO2 Emission: ${highestAverageCO2Emision.toFixed(
        4
      )}`
    );
  });
