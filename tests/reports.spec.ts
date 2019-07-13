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
            expect((result["UBPOPGAVG"])).to.be.equal("Aruba");  
        });        
        
        
        it('calculate with missing elements', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata2.csv"),",",3);
            let result = await r.generateReport([
                {code: "UBPOPGAVG",options : {fromYear : 1960, toYear : 1962}}
            ]);
            expect((result["UBPOPGAVG"])).to.be.equal("Afghanistan");  
        });        
        
        
        it('calculate with negative values', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata3.csv"),",",3);
            let result = await r.generateReport([
                {code: "UBPOPGAVG",options : {fromYear : 1960, toYear : 1962}}
            ]);
            expect((result["UBPOPGAVG"])).to.be.equal("Afghanistan");
        });   
        
    });
    

    
    describe('highest "CO2 emissions (kt)', async()=>{
        it('Calculate with all values present (Single row)', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdataco21.csv"),",",3);
            let result = await r.generateReport([
                {code: "HGCO2EMYR",options:{fromYear : 1960, toYear : 1964}}
            ]);
            expect(Number(result["HGCO2EMYR"])).to.be.equal(1963);            
        });

        it('Calculate with all values present (Multiple rows)', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdataco22.csv"),",",3);
            let result = await r.generateReport([
                {code: "HGCO2EMYR",options:{fromYear : 1960, toYear : 1964}}
            ]);
            expect(Number(result["HGCO2EMYR"])).to.be.equal(1961);            
        });

        /*  
            ---------------------------------
            Country 1960   1961   1962   1963
            ---------------------------------
            ABW     100    200    200    300  
            AFG            200    400    100  
            IND     700    100           700
            ---------------------------------
            AVG    (400)   166    300    366 
        */
        it('calculate with missing elements', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdataco23.csv"),",",3);
            let result = await r.generateReport([
                {code: "HGCO2EMYR",options:{fromYear : 1960, toYear : 1963}}
            ]);
            expect(Number(result["HGCO2EMYR"])).to.be.equal(1960);     
        });                            
    }) 
       
 });



    
