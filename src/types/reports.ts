interface SearchParams {
  field: string;
  value: string;
  minYear: number;
  maxYear: number;
  countryField: string;
}

export type ISearchParams = SearchParams[];

export interface IHighestCO2EmissionData {
  [k: string]: string[];
}

export interface IReportData {
  country: string;
  highestPopulationGrowth: number;
  highestCO2EmissionData: IHighestCO2EmissionData;
}

export interface IAvgCO2EmissionPerYear {
  [k: string]: number;
}

export interface IGetReportsResponse {
  year: string | undefined;
  country: string;
}
