import * as Koa from 'koa';
import * as bodyParser from 'koa-body';
import * as Router from 'koa-router';

import { processor } from './lib/csv';

const app = new Koa();
const _ = new Router();

const getStats = (async(ctx) => {
    let response: any;
    let result: Array<any> = [];
    const url = ctx.request.url;
    const id = url.replace('/getStats/', '');

    const stats: any = await processor('src/lib/data/data.csv');

    console.log('id', id);
    if (id === '1') {
        let highestAvg: any = { country: '', average: 0 };
        stats.map((row) => {
            let fullRange: boolean = true;
            let count: number = 0;
            if(row['Indicator Name'] === 'Urban population growth (annual %)'){
                for (let i=1980; i<=1990; i++) {
                    const value = row[`${i.toString()}`]
                    if (value === '' || value === undefined) {
                        fullRange = false;
                    }
                    count = count + parseInt(value);
                }

                if (fullRange) {
                    const currentAverage = count/10;
                    if (highestAvg.average < currentAverage) {
                        highestAvg.country = row['Country Name'];
                        highestAvg.average = currentAverage;
                    }
                }
            }
        });

        response = highestAvg;
    } else if ((id === '2')) {
        let highestAvg: any = { country: '', average: 0 };
        stats.map((row) => {
            let count: number = 0;
            let totalAvalable = 0;
            if(row['Indicator Name'] === 'CO2 emissions (kt)'){
                for (let i=1960; i<=2017; i++) {
                    const value = row[`${i.toString()}`]
                    if (value !== '') {
                        totalAvalable++;
                        count = count + parseInt(value);
                    }
                }

                const currentAverage = count/totalAvalable;
                if (highestAvg.average < currentAverage) {
                    highestAvg.country = row['Country Name'];
                    highestAvg.average = currentAverage;
                }
            }
        });

        response = highestAvg;

    } else {
        response = { notice: 'report type not implimented!' };
    }

    if (ctx) {
        ctx.body = response;
    }
    return ctx;
});

_.get('/getStats/:id', getStats);

app
.use(bodyParser())
.use(_.routes())
export const server = app.listen(3000);