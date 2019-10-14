import { getCo2EmissionsAverage } from '../../lib/co2Emissions';
import { getFilterdStats } from '../../lib/database';
import { urbanPopulation } from './fixtures/response';

describe('getCo2EmissionsAverage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('is a function', () => {
        expect(getCo2EmissionsAverage).toBeInstanceOf(Function);
    });

    it('returns correct output', async () => {
        (getFilterdStats as any) = jest.fn()
            .mockResolvedValueOnce(urbanPopulation);

        const response = await getCo2EmissionsAverage();

        expect(response).toBeTruthy();
        expect(getFilterdStats).toBeCalledTimes(1);
        expect(response.country).toBe('Australia');
        expect(response.average).toBe(0.97);
    });
});