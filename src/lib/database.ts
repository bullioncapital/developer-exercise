import { getModel } from './model/stats';

export const getFilterdStats = (async (indicator: string) => {
    const StatsModel: any = await getModel();
    const response: Array<object> = await StatsModel.find()
    .where('Indicator Name').equals(indicator)
    .catch((error) => {
      console.log('error : ', error);
      throw new Error(error);
    });

    return response
});