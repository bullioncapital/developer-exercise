import getReports from "./reports";
import { IGetReportsResponse } from "./types";

const reports: IGetReportsResponse = getReports();

// tslint:disable-next-line
console.log(`The country with the highest average "Urban population growth (annual %)" between 1980 and 1990: ${reports.country}`);
// tslint:disable-next-line
console.log(`The year with the highest "CO2 emissions (kt)", averaged across each country: ${reports.year}`);
