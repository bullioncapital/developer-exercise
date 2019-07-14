import { Report, WEIReportCodes } from './classes/report';
import path = require('path');

(async () => {
    let r = new Report(path.resolve(__dirname, '../data.csv'), ',', 3);
    let result = await r.generateReport([
        { code: WEIReportCodes.HigestUrbanPopAvgGrowthCountry, options: { fromYear: 1980, toYear: 1990 } },
        { code: WEIReportCodes.HighestCO2EmissionsYear, options: { fromYear: 1960, toYear: 2017 } },
    ]);

    if (result[WEIReportCodes.HigestUrbanPopAvgGrowthCountry]) {
        console.log(
            'The country with the highest average Urban population growth (annual %) : ' +
                result[WEIReportCodes.HigestUrbanPopAvgGrowthCountry],
        );
    }
    if (result[WEIReportCodes.HighestCO2EmissionsYear]) {
        console.log(
            'The year with the highest CO2 emissions (kt), averaged across each country : ' +
                result[WEIReportCodes.HighestCO2EmissionsYear],
        );
    }
})();
