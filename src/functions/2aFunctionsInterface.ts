import { ICountry, IIndicator } from "./commonInterface";

export interface ICountryAndAverage extends ICountry, IIndicator {
  // build country and indicator informations with its average
  average: number;
}
