const Table = require('cli-table');

import * as path from 'path';
import CSVLoader from './CSVLoader';
import {FilterByIndicatorName, FilterByYearRange} from './FilterFunctions';
import {MapAverageValueBetweenYears, MapYearKVPairToObject} from './MapFunctions';
import {ReduceMaxValue, ReduceYearSum} from './ReduceFunctions';

async function main(): Promise<void> {
  const csv: CSVLoader = new CSVLoader();
  csv.path = path.join('.', 'assets', 'data.csv');
  await csv.load();
  await csv.parse();

  const parsedData: any[] = csv.data;
  const minYear: number = 1980;
  const maxYear: number = 1990;
  const highestPopulationGrowth: { country: string, value: number } = parsedData
    .filter(FilterByIndicatorName('Urban population growth (annual %)'))
    .filter(FilterByYearRange(minYear, maxYear))
    .map(MapAverageValueBetweenYears(minYear, maxYear))
    .reduce(ReduceMaxValue('value'));

  const co2: any = parsedData
    .filter(FilterByIndicatorName('CO2 emissions (kt)'))
    .reduce(ReduceYearSum);

  const co2Year: { year: string, sum: number, count: number, average: number } = Object.entries(co2)
    .map(MapYearKVPairToObject)
    .reduce(ReduceMaxValue('average'));

  const table = new Table();
  table.push(highestPopulationGrowth, co2Year);

  console.log(table.toString());
}

main();