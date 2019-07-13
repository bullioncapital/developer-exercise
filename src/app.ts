import { Report } from './classes/report';
const path = require('path');

(async()=>{
    let r = new Report(path.resolve(__dirname,"../data.csv"),",",3);
    let result =await r.generateReport([
        {code: "UBPOPGAVG" , options : {fromYear : 1980, toYear : 1990}},
        {code: "HGCO2EMYR",  options : {fromYear : 1960, toYear : 2017}}
    ]);    

    console.log("Result is " + JSON.stringify(result));

})()