import * as Ajv from 'ajv';
import { getAverageUrbanPopulation } from './urbanPopulation';
import { getCo2EmissionsAverage } from './co2Emissions';
import * as schema from './../../resources/schema/statsRequest.json';

export const getStats = (async (ctx) => {
    let response: any;
    const { request: { body } } = ctx;
    const { reportid } = body;

    // validate the request agains the json schema to ensure intergrity of the request data
    const ajv = new Ajv ({ allErrors: true });
    const valid = ajv.validate(schema, body); 
    if (!valid) {
        console.log('validation Errors : ', ajv.errors);
        // todo: make the errors json API complient.
        throw Error('Schema Validation Error!');
    }

    if (reportid === 1) {
        response = await getAverageUrbanPopulation();
    } else if ((reportid === 2)) {
        response = await getCo2EmissionsAverage();
    } else {
        response = { notice: 'report type not implemented!' };
    }

    if (ctx) {
        ctx.body = response;
    }

    return ctx;
});
