import { WDIReport, WDIReportCodes } from './classes/report';
import path = require('path');

(async () => {
    let r = new WDIReport(path.resolve(__dirname, '../data.csv'), ',', 3);
    let result = await r.analyseReport([
        { code: WDIReportCodes.HigestUrbanPopAvgGrowthCountry, options: { fromYear: 1980, toYear: 1990 } },
        { code: WDIReportCodes.HighestCO2EmissionsYear, options: { fromYear: 1960, toYear: 2017 } },
    ]);

    if (result[WDIReportCodes.HigestUrbanPopAvgGrowthCountry]) {
        console.log(
            'The country with the highest average Urban population growth (annual %) : ' +
                result[WDIReportCodes.HigestUrbanPopAvgGrowthCountry],
        );
    }
    if (result[WDIReportCodes.HighestCO2EmissionsYear]) {
        console.log(
            'The year with the highest CO2 emissions (kt), averaged across each country : ' +
                result[WDIReportCodes.HighestCO2EmissionsYear],
        );
    }
})();
