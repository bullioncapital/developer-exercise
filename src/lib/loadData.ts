import { each as BPEach } from 'bluebird';
import { processor } from './readCSV';
import { getModel } from './model/stats';
import { statsFields } from './model/statsFields';

(async () => {
    const dataSet = await processor('src/lib/data/data.csv');
    const StatsModel: any = await getModel();

    let rowObject = {};
    await BPEach(dataSet, async (data) => {
        statsFields.map((value) => {
            rowObject[value] = data[value];
        });
        const Stats: any = new StatsModel(rowObject);
        const response = await Stats.save()
        .catch((error) => {
            console.log('Error: ', error);
        });

        console.log(response);
    });
    
    process.exit();
})();
