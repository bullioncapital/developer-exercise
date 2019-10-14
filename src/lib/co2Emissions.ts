import { getFilterdStats } from './database';

export interface IHighestAverage {
    country: string;
    average: number;
}

// exoected return result {"country":"World","average":21348295.636363637}
export const getCo2EmissionsAverage = (async (): Promise<IHighestAverage> => {
    let highestAverage: IHighestAverage = { country: '', average: 0 };
    const filterdData: Array<object> = await getFilterdStats('CO2 emissions (kt)');
    
    filterdData.map((row) => {
        let count: number = 0;
        let totalAvalable = 0;
        for (let i=1960; i<=2017; i++) {
            const value = row[`${i.toString()}`]
            if (value !== '') {
                totalAvalable++;
                count = count + parseInt(value);
            }
        }

        const currentAverage = count/totalAvalable;
        if (highestAverage.average < currentAverage) {
            highestAverage.country = row['Country Name'];
            highestAverage.average = parseFloat((currentAverage as any).toFixed(2));
        }
    });

    return highestAverage;
});
