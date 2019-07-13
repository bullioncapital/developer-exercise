import { Report } from './classes/report';
const path = require('path');

(async()=>{
    let r = new Report(path.resolve(__dirname,"../data.csv"),",",3);
    let result =await r.generateReport([
        {code: "UBPOPGAVG" , options : {fromYear : 1980, toYear : 1990}},
        {code: "HGCO2EMYR",  options : {fromYear : 1960, toYear : 2017}}
    ]);
    
    //TODO : Update
    if(result["UBPOPGAVG"]){
        console.log("The country with the highest average Urban population growth (annual %) : " +  result["UBPOPGAVG"]);
    }
    if(result["HGCO2EMYR"]){
        console.log("The year with the highest CO2 emissions (kt), averaged across each country : " +  result["HGCO2EMYR"]);
    }
})()