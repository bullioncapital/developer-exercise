import { Json } from '@types';
const csv = require('csvtojson');
const fs = require('fs');

enum WDIReportCodes {
    HigestUrbanPopAvgGrowthCountry,
    HighestCO2EmissionsYear,
}

interface WDIReportOptions {
    code: WDIReportCodes;
    options: Json;
}

interface Country {
    code: string;
    name: string;
}

interface UrbanPopResult {
    value: number;
    country: Country;
}

interface CO2Emission {
    value: number;
    count: number;
}

type CO2EmissionMap = Record<number, CO2Emission>;

class WDIReport {
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

   /**
   * @remarks
   *
   * The `constructor` member implements the initialization of the Report.
   *
   * @param absFilePath - Absolute path of the csv file
   * @param delimiter -  CSV file delimiter
   * @param skipLn - Number of lines to skip in the file to reach the first row. New lines are ignored automatically, headers are defined locally above
   */
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

   /**
   * @remarks
   *
   * The `computeAvgUrbanPopGrowthCountry` computes and stores the country with highest average urban population between year ranges in
   * last parameter used as an accumulator. Any country which does not have an entry in the specified range is excluded form the calculation
   * 
   *
   * @param data - JSON object of the line for which contains population data
   * @param fromYear -  Start of year range.
   * @param toYear - End of year range
   * @param urbAvgPop - Accumulator to store the highest average growth encountered so far
   */    
    private computeAvgUrbanPopGrowthCountry(data: Json, fromYear: number, toYear: number, urbAvgPop: UrbanPopResult) {
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

   /**
   * @remarks
   *
   * The `doesValueExist`  is a helper to see if a value exist at a particular column in the CSV
   * 
   *
   * @param data - JSON object of the line for which contains data
   * @param field -  Heading of of the column for which we need to check data. ex data['Indicator Name'] 
   * @returns boolean - Accumulator to store the highest average growth encountered so far
   */       
    private doesValueExist(data: Json, field: string): boolean {
        if (data[field] === '' || data[field] == undefined || data[field] == null) {
            return false;
        }
        return true;
    }

   /**
   * @remarks
   *
   * The `accumulateAvgCO2EmissionsYear`  is a helper to create a map of emissions/year across countries for the given year range. The count is 
   * increased only if the country has emission data. Absense of an entry for a year will not impact the average computation. The param `co2Emission` 
   * is used as an accumulator across calls.
   * 
   *
   * @param data - JSON object of the line for which contains data
   * @param fromYear -  Start of year range.
   * @param toYear - End of year range
   * @param co2Emission -  Heading of of the column for which we need to check data. ex data['Indicator Name'] 
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

   /**
   * @remarks
   *
   * The `computeHigestAvgCO2EmissionsYear`  computes the highest average emission for the year for the given year range 
   *
   * @param co2Emission - Map of yearly emissions across the range.
   * @param fromYear -  Start of year range.
   * @param toYear - End of year range
   * @returns number -  The year with maximum average CO2 emissions.
   */
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

   /**
   * @remarks
   *
   * The `analyseReport` is the entry point to analyseReport a Word Development Indicators report.
   *
   * @param options - This structure takes a report code and options (if any) for the report.See `WDIReportOptions` for format. 
   * @returns Json -  Json type which has the results of parsing the report.
   */    
    public async analyseReport(options: WDIReportOptions[]): Promise<Json> {
        let lines = 0;
        let urbAvgPop: UrbanPopResult = {} as any;
        urbAvgPop.country = {} as any;
        let co2Emission: CO2EmissionMap = {};

        const csvData = await csv(
            {
                noheader: true,
                headers: WDIReport.headers,
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
                            String(data['Indicator Code']) === WDIReport.IND_URB_POP_GROWTH &&
                            opt.code == WDIReportCodes.HigestUrbanPopAvgGrowthCountry
                        ) {
                            this.computeAvgUrbanPopGrowthCountry(
                                data,
                                Number(opt.options.fromYear),
                                Number(opt.options.toYear),
                                urbAvgPop,
                            );
                        } else if (
                            String(data['Indicator Code']) === WDIReport.IND_CO2_EMISSIONS &&
                            opt.code == WDIReportCodes.HighestCO2EmissionsYear
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
            if (opt.code == WDIReportCodes.HigestUrbanPopAvgGrowthCountry) {
                rVal[opt.code] = urbAvgPop.country.name;
            }

            if (opt.code == WDIReportCodes.HighestCO2EmissionsYear) {
                let fromYear = Number(opt.options.fromYear);
                let toYear = Number(opt.options.toYear);
                let maxAvgYear = this.computeHigestAvgCO2EmissionsYear(co2Emission, fromYear, toYear);
                rVal[opt.code] = maxAvgYear;
            }
        }
        return rVal;
    }
}

export { WDIReport, WDIReportCodes };
