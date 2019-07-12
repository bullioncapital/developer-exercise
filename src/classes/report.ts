const csv = require('csv-parser')
const fs = require('fs')


interface ReportOptions{
    code : string,
    options? : {
        fromYear? : number,
        toYear? : number
    }
}

class Report {

    private absFilePath : string;
    private delimiter : string;
    private skipLn : number;

    constructor(absFilePath:string,delimiter:string,skipLn: number) {
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
    private highestAvgUrbanPopGrowthCountry(data: object,fromYear: number, toYear: number): string {
        return 'test';
    }

    /*
    The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
    */
    private async highestAvgCO2EmissionsYear(): Promise<number> {
        return await 1800;
    }

    public async generateReport(options: ReportOptions[]) {
        //Call to generate report
        fs.createReadStream(this.absFilePath)
        .pipe(csv({skipLines:this.skipLn,separator: this.delimiter}))
        .on('data',async (data:string) => {
            console.log(data);
            console.log(await this.highestAvgCO2EmissionsYear())
        });          
    }
}

export { Report };