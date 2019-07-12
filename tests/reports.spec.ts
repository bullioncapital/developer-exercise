import { expect } from 'chai';
import { Report,Json } from '../src/classes/report';
const assert = require('assert');
const path = require('path');
import 'mocha';

describe('Report testing', function() {
    it('should throw if file does not exist', function() {        
        expect(()=> new Report(path.resolve(__dirname,"./reportdata/data9987.csv"),",",4)).to.throw('File does not exist');     
    }); 

    describe('Urban population growth', ()=>{
        
        it('Calculate with all values present', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata1.csv"),",",3);
            let result =await r.generateReport([
                {code: "UBPOPGAVG" , options : {fromYear : 1960, toYear : 1962}}
            ]);
            expect(Number(result["UBPOPGAVG"])).to.be.equal(2.2358187603801);  
        });        
        
        
        it('calculate with missing elements', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata2.csv"),",",3);
            let result = await r.generateReport([
                {code: "UBPOPGAVG",options : {fromYear : 1960, toYear : 1962}}
            ]);
            expect(Number(result["UBPOPGAVG"])).to.be.equal(2.2358187603801);            
        });        
        
        
        it('calculate with negative values', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata3.csv"),",",3);
            let result = await r.generateReport([
                {code: "UBPOPGAVG",options : {fromYear : 1960, toYear : 1962}}
            ]);
            expect(Number(result["UBPOPGAVG"])).to.be.equal(-0.26639423195478334)
            //console.log(result);
        });   
        
    });

    /*
    describe('highest "CO2 emissions (kt)', async()=>{
        it('Calculate with all values present', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata1.csv"),",",3);
            let result = await r.generateReport([
                {code: "HGCO2AVG"}
            ]);
            expect(false).to.be.true;
        });
    
        it('calculate with missing elements', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata1.csv"),",",3);
            let result = await r.generateReport([
                {code: "HGCO2AVG"}
            ]);
            expect(false).to.be.true;
        });

        it('calculate with negative values', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata1.csv"),",",3);
            let result = await r.generateReport([
                {code: "HGCO2AVG"}
            ]);
            expect(false).to.be.true;
        });                
    }) 
    */
   
 });



    
