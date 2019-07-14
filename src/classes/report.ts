import { Json } from '@types';
const csv = require('csvtojson');
const fs = require('fs');

enum WEIReportCodes {
    HigestUrbanPopAvgGrowthCountry,
    HighestCO2EmissionsYear,
}

interface ReportOptions {
    code: WEIReportCodes;
    options: Json;
}

interface Country {
    code: string;
    name: string;
}

interface UprbanPopResult {
    value: number;
    country: Country;
}

interface CO2Emission {
    value: number;
    count: number;
}

type CO2EmissionMap = Record<number, CO2Emission>;

class Report {
    private absFilePath: string;
    private delimiter: string;
    private skipLn: number;

    private static readonly headers: string[] = [
        'Country Name',
        'Country Code',
        'Indicator Name',
        'Indicator Code',
        '1960',
        '1961',
        '1962',
        '1963',
        '1964',
        '1965',
        '1966',
        '1967',
        '1968',
        '1969',
        '1970',
        '1971',
        '1972',
        '1973',
        '1974',
        '1975',
        '1976',
        '1977',
        '1978',
        '1979',
        '1980',
        '1981',
        '1982',
        '1983',
        '1984',
        '1985',
        '1986',
        '1987',
        '1988',
        '1989',
        '1990',
        '1991',
        '1992',
        '1993',
        '1994',
        '1995',
        '1996',
        '1997',
        '1998',
        '1999',
        '2000',
        '2001',
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
    ];

    private static readonly IND_URB_POP_GROWTH = 'SP.URB.GROW';
    private static readonly IND_CO2_EMISSIONS = 'EN.ATM.CO2E.KT';

    constructor(absFilePath: string, delimiter: string, skipLn: number) {
        this.absFilePath = absFilePath;
        this.delimiter = delimiter;
        this.skipLn = skipLn;
        if (!fs.existsSync(this.absFilePath)) {
            throw Error('File does not exist');
        }
    }

    /*
    The country with the highest average "Urban population growth (annual %)" between 1980 and 1990. 
    Exclude countries where any data entry for this time range is missing.
    */
    private computeAvgUrbanPopGrowthCountry(data: Json, fromYear: number, toYear: number, urbAvgPop: UprbanPopResult) {
        let total = 0;

        for (let year = fromYear; year <= toYear; ++year) {
            if (!this.doesValueExist(data, String(year))) {
                return;
            }
            total += Number(data[year]);
        }

        let avg = total / (toYear - fromYear + 1);

        if (urbAvgPop.value == undefined || urbAvgPop.value == null || avg > urbAvgPop.value) {
            urbAvgPop.value = avg;
            urbAvgPop.country.code = String(data['Country Code']);
            urbAvgPop.country.name = String(data['Country Name']);
        }
        return;
    }

    private doesValueExist(data: Json, field: string): boolean {
        if (data[field] === '' || data[field] == undefined || data[field] == null) {
            return false;
        }
        return true;
    }

    /*
    The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
    */
    private accumulateAvgCO2EmissionsYear(data: Json, fromYear: number, toYear: number, co2Emission: CO2EmissionMap) {
        for (let year = fromYear; year <= toYear; ++year) {
            if (co2Emission[year] === undefined) {
                co2Emission[year] = {} as any;
                co2Emission[year].count = 0;
                co2Emission[year].value = 0;
            }

            if (this.doesValueExist(data, String(year))) {
                co2Emission[year].count += 1;
                co2Emission[year].value += Number(data[year]);
            }
        }
    }

    private computeHigestAvgCO2EmissionsYear(co2Emission: CO2EmissionMap, fromYear: number, toYear: number): number {
        let maxAverage = -1;
        let maxAvgYear = -1;
        for (let year = fromYear; year <= toYear; ++year) {
            if (co2Emission[year].count !== 0) {
                let average = co2Emission[year].value / co2Emission[year].count;
                if (average > maxAverage) {
                    maxAverage = average;
                    maxAvgYear = year;
                }
            }
        }
        return maxAvgYear;
    }

    public async generateReport(options: ReportOptions[]): Promise<Json> {
        let lines = 0;
        let urbAvgPop: UprbanPopResult = {} as any;
        urbAvgPop.country = {} as any;
        let co2Emission: CO2EmissionMap = {};

        const csvData = await csv(
            {
                noheader: true,
                headers: Report.headers,
                delimiter: this.delimiter,
            },
            { objectMode: true },
        )
            .fromFile(this.absFilePath)
            .on('data', (data: Json) => {
                if (lines < this.skipLn) {
                    ++lines;
                } else {
                    for (let opt of options) {
                        if (
                            String(data['Indicator Code']) === Report.IND_URB_POP_GROWTH &&
                            opt.code == WEIReportCodes.HigestUrbanPopAvgGrowthCountry
                        ) {
                            this.computeAvgUrbanPopGrowthCountry(
                                data,
                                Number(opt.options.fromYear),
                                Number(opt.options.toYear),
                                urbAvgPop,
                            );
                        } else if (
                            String(data['Indicator Code']) === Report.IND_CO2_EMISSIONS &&
                            opt.code == WEIReportCodes.HighestCO2EmissionsYear
                        ) {
                            let fromYear = Number(opt.options.fromYear);
                            let toYear = Number(opt.options.toYear);
                            this.accumulateAvgCO2EmissionsYear(data, fromYear, toYear, co2Emission);
                        }
                    }
                }
            })
            .on('done', () => {});
        let rVal: Json = {};
        for (let opt of options) {
            if (opt.code == WEIReportCodes.HigestUrbanPopAvgGrowthCountry) {
                rVal[opt.code] = urbAvgPop.country.name;
            }

            if (opt.code == WEIReportCodes.HighestCO2EmissionsYear) {
                let fromYear = Number(opt.options.fromYear);
                let toYear = Number(opt.options.toYear);
                let maxAvgYear = this.computeHigestAvgCO2EmissionsYear(co2Emission, fromYear, toYear);
                rVal[opt.code] = maxAvgYear;
            }
        }
        return rVal;
    }
}

export { Report, WEIReportCodes };
