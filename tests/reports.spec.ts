import { expect } from 'chai';
import { Report } from '../src/classes/report';
const assert = require('assert');
const path = require('path');
import 'mocha';

describe('Report testing', function() {
    it('should throw if file does not exist', function() {        
        expect(()=> new Report(path.resolve(__dirname,"./reportdata/testdata2.csv"),",",4)).to.throw('File does not exist');     
    }); 

    describe('Urban population growth', async()=>{
        it('Calculate with all values present', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata1.csv"),",",4);
            let result = await r.generateReport([
                {code: "UBPOPGAVG" , options : {fromYear : 1980, toYear : 1990}}
            ]);
            expect(false).to.be.true;
        });
    
        it('calculate with missing elements', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata1.csv"),",",4);
            let result = await r.generateReport([
                {code: "UBPOPGAVG",options : {fromYear : 1980, toYear : 1990}}
            ]);
            expect(false).to.be.true;
        });

        it('calculate with negative values', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata1.csv"),",",4);
            let result = await r.generateReport([
                {code: "UBPOPGAVG",options : {fromYear : 1980, toYear : 1990}}
            ]);
            expect(false).to.be.true;
        });        
    });


    describe('highest "CO2 emissions (kt)', async()=>{
        it('Calculate with all values present', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata1.csv"),",",4);
            let result = await r.generateReport([
                {code: "HGCO2AVG"}
            ]);
            expect(false).to.be.true;
        });
    
        it('calculate with missing elements', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata1.csv"),",",4);
            let result = await r.generateReport([
                {code: "HGCO2AVG"}
            ]);
            expect(false).to.be.true;
        });

        it('calculate with negative values', async()=>{
            let r = new Report(path.resolve(__dirname,"./reportdata/testdata1.csv"),",",4);
            let result = await r.generateReport([
                {code: "HGCO2AVG"}
            ]);
            expect(false).to.be.true;
        });        
    })    
   
 });



    
