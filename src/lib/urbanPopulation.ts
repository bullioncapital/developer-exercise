import { IHighestAverage } from './co2Emissions';
import { getFilterdStats } from './database';
 
// expected return {"country":"Botswana","average":12.9}
export const getAverageUrbanPopulation = (async (): Promise<IHighestAverage> => {
    const filterdData: Array<object> = await getFilterdStats('Urban population growth (annual %)');

    let highestAverage: IHighestAverage = { country: '', average: 0 };
    filterdData.map((row) => {
        let fullRange: boolean = true;
        let count: number = 0;
        for (let i=1980; i<=1990; i++) {
            const value = row[`${i.toString()}`]
            if (value === '' || value === undefined) {
                fullRange = false;
            }
            count = count + parseInt(value);
        }

        if (fullRange) {
            const currentAverage = count/10;
            if (highestAverage.average < currentAverage) {
                highestAverage.country = row['Country Name'];
                highestAverage.average = currentAverage;
            }
        }
    });

    return highestAverage;
});