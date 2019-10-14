import { processor } from '../../lib/readCSV';

describe('getAverageUrbanPopulation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('is a function', () => {
        expect(processor).toBeInstanceOf(Function);
    });

    it('returns correct output', async () => {
        const response = await processor('src/__tests__/unit/fixtures/data.csv');

        expect(response).toBeTruthy();
        expect(response.length).toEqual(2);
    });

    it('returns read error', async () => {
        let errors;
        await processor('').catch((err) => errors = err);
    
        expect(errors).toBeTruthy();
        expect(errors).toThrowErrorMatchingSnapshot();
    });
});