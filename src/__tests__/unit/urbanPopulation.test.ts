import { getAverageUrbanPopulation } from './../../lib/urbanPopulation';
import { getFilterdStats } from './../../lib/database';
import { urbanPopulation } from './fixtures/response';

describe('getAverageUrbanPopulation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('is a function', () => {
        expect(getAverageUrbanPopulation).toBeInstanceOf(Function);
    });

    it('returns correct output', async () => {
        (getFilterdStats as any) = jest.fn()
            .mockResolvedValueOnce(urbanPopulation);

        const response = await getAverageUrbanPopulation();

        expect(response).toBeTruthy();
        expect(getFilterdStats).toBeCalledTimes(1);
        expect(response.country).toBe('Australia');
        expect(response.average).toBe(2.2);
    });
});