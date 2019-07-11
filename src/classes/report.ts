class Report {
    private static indicatorCodes: string[] = [
        'SP.URB.GROW', //"Urban population growth (annual %)"
        'EN.ATM.CO2E.KT', //CO2 emissions (kt)
    ];

    constructor() {
        //Check if file is valid
        //Collect and check which indicators we need to process
    }

    /*
    The country with the highest average "Urban population growth (annual %)" between 1980 and 1990. 
    Exclude countries where any data entry for this time range is missing.
    */
    private highestAvgUrbanPopGrowthCountry(fromYear: number, toYear: number): string {
        return 'test';
    }

    /*
    The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
    */
    private highestAvgCO2EmissionsYear(): number {
        return 1800;
    }

    public generateReport() {
        //Call to generate report
    }
}

export { Report };
