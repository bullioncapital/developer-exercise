const csv = require('csvtojson')
const fs = require('fs')


interface ReportOptions{
    code : string,
    options : Json    
}

interface Country{
    code : string,
    name : string
}

interface UprbanPopResult{
    value : number,
    country : Country
}

interface CO2Emission{
    value : number,
    count : number
}
type CO2EmissionMap = Record<number, CO2Emission>;


interface Json {
    [x: string]: string|number|boolean|Date|Json|JsonArray;
}
interface JsonArray extends Array<string|number|boolean|Date|Json|JsonArray> { }


class Report {

    private absFilePath : string;
    private delimiter : string;
    private skipLn : number;
    private static headers: string[]  = [
        "Country Name",
        "Country Code",
        "Indicator Name",
        "Indicator Code",
        "1960",
        "1961",
        "1962",
        "1963",
        "1964",
        "1965",
        "1966",
        "1967",
        "1968",
        "1969",
        "1970",
        "1971",
        "1972",
        "1973",
        "1974",
        "1975",
        "1976",
        "1977",
        "1978",
        "1979",
        "1980",
        "1981",
        "1982",
        "1983",
        "1984",
        "1985",
        "1986",
        "1987",
        "1988",
        "1989",
        "1990",
        "1991",
        "1992",
        "1993",
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017"
    ]


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
   private highestAvgUrbanPopGrowthCountry(data: Json,fromYear: number, toYear: number,urbAvgPop: UprbanPopResult ){
        let total : number = 0;

        //console.log("Data " + JSON.stringify(data));
        for(let year = fromYear; year <=toYear; ++year){

            if(!this.doesValueExist(data,String(year))){
                //console.log("Missing data");
                return;
            }          
            total += Number(data[year]);        
        }
        
        let avg = total/((toYear - fromYear) +1);

        if(urbAvgPop.value == undefined || urbAvgPop.value == null || avg > urbAvgPop.value ){   
            //console.log("Setting new value");
            urbAvgPop.value = avg;
            urbAvgPop.country.code = String(data['Country Code']);
            urbAvgPop.country.name = String(data['Country Name']);
        }
        return;     
    }

    private doesValueExist(data:Json,field: string): boolean{
        if(data[field]==="" ||data[field]==undefined || data[field]==null){
            return false;
        }
        return true;
    }   

    /*
    The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
    */
   //TODO : Incorrect logic in computation , needs to be fixed
    private highestAvgCO2EmissionsYear(data:Json,co2Emission:CO2EmissionMap){
        
        for(let year = 1960; year <= 2017;++year){
            if(this.doesValueExist(data,String(year))){
                co2Emission[year].count+=1;
                co2Emission[year].value+= Number(data[year])                
            } else{
                co2Emission[year].count+=1; 
            }           
        }        
    }

    public async generateReport(options:ReportOptions[]):Promise<Json>{
        let lines = 0;
        let urbAvgPop : UprbanPopResult = {} as any;
        urbAvgPop.country = {} as any;

        //TODO : Read from columns perhaps?
        let co2Emission : CO2EmissionMap = {};
        for(let year = 1960; year <= 2017;++year){
            co2Emission[year] = {value:0,count:0}
        }

        const csvData = await csv({
            noheader: true,
            headers: Report.headers,
            delimiter : this.delimiter,
            },
            {objectMode: true})
        .fromFile(this.absFilePath)
        .on('data', (data:Json) => {
            if(lines < this.skipLn){
                ++lines;
            }else {
                //console.log(JSON.stringify(data))
                for(let opt of options){
                    if(String(data["Indicator Code"]) === "SP.URB.GROW" && opt.code == "UBPOPGAVG"){
                        this.highestAvgUrbanPopGrowthCountry(data,Number(opt.options.fromYear),Number(opt.options.toYear),urbAvgPop);                    
                    } else if(String(data["Indicator Code"]) === "EN.ATM.CO2E.KT" && opt.code == "HGCO2EMYR"){
                        this.highestAvgCO2EmissionsYear(data,co2Emission);
                    }
                }                
            }
          })
        .on('done', ()=> {});          
        let rVal: Json = {};
        for(let opt of options){
            if(opt.code == "UBPOPGAVG"){
                rVal[opt.code] = urbAvgPop.value
            }            
        }

        let maxAverage = -1;
        let maxAvgYear = -1;
        for(let year = 1960; year <= 2017;++year){
           if(co2Emission[year].count!==0){
            let average = co2Emission[year].value/co2Emission[year].count;
            if(average > maxAverage){
                maxAverage = average;
                maxAvgYear = year;
            }
           }           
        }
        console.log("Max average year is " + maxAvgYear);       
        return rVal;
    }
}

export { Report,Json };