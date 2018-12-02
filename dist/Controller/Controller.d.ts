import Country from '../Model/Country';
declare type Countries = {
    [countryCode: string]: Country;
};
export default class Controller {
    countries: Countries | undefined;
    private filePath;
    startYear: number;
    endYear: number;
    constructor(filePath: string);
    init(): Promise<any>;
    getCountryWithHighestAvgIndicatorInRangeOfYear(indicatorCode: string, startYear: number, endYear: number): {
        name: string;
    };
    getCountryWithHighestAvgIndicatorInRangeOfYear(indicatorCode: string, startYear: number, endYear: number): undefined;
    getYearWithHighestValueOfIndicators(indicatorCode: string): {
        year: number;
        averageValue: number;
    };
    getYearWithHighestValueOfIndicators(indicatorCode: string): void;
}
export {};
