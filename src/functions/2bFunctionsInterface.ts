import { IDate } from "./commonInterface";

export interface IDateAndValues extends IDate {
  // build date with all the country values
  values: number[];
}

export interface IDateAndAverage extends IDate {
  // build dates with there average
  average: number;
}
