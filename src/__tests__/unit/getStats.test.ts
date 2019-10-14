import { getStats } from './../../lib/getStats';
import { fullContext } from './fixtures/response'
import { getAverageUrbanPopulation } from './..//../lib/urbanPopulation';
import { getCo2EmissionsAverage } from './../../lib/co2Emissions';

describe('getStats', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('is a function', () => {
        expect(getStats).toBeInstanceOf(Function);
    });

    it('returns correct output - report 1', async () => {
        const context = fullContext();
        (getAverageUrbanPopulation as any) = jest.fn()
            .mockResolvedValueOnce({
                country: 'Botswana',
                average: 12.9
            });
        let errors: any;
        await getStats(context).catch((err) => errors=err);
        expect(errors).toBeFalsy();
        expect(getAverageUrbanPopulation).toBeCalledTimes(1);
    });

    it('returns correct output - report 2', async () => {
        const context = fullContext();
        context.request.body.reportid = 2;
        (getCo2EmissionsAverage as any) = jest.fn()
            .mockResolvedValueOnce({
                country: 'Botswana',
                average: 12.9
            });
        let errors: any;
        await getStats(context).catch((err) => errors=err);
        expect(errors).toBeFalsy();
        expect(getCo2EmissionsAverage).toBeCalledTimes(1);
    });
});