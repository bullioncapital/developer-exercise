import db from '../db/SqliteClient';
import FmService from "../service/FmService";

describe('service', () => {
    let service: FmService = null;
    beforeAll(async () => {
        await db.init();
        service = new FmService();
    });
    afterAll(async () => {
        await db.close();
    })
    it("should be able to get next page", async() => {
        const rows = await service.paginate(1, 5);
        expect(rows.map(r => r.FMID)).toEqual([1000001, 1000003, 1000007, 1000009, 1000010])
    });
    it("should be able to get prev page", async() => {
        const rows = await service.paginate(1000016, -5);
        expect(rows.map(r => r.FMID)).toEqual([1000011, 1000013, 1000014, 1000015, 1000016])
    });
    it("should hit cache when querying same id twice", async() => {
        const spy = jest.spyOn(db, 'each');
        let rows = await service.paginate(1000021, 1);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(rows.length).toEqual(1);
        expect(rows[0].FMID).toEqual(1000021);
        spy.mockRestore();
        rows = await service.paginate(1000021, 1);
        expect(spy).toHaveBeenCalledTimes(0);
        expect(rows.length).toEqual(1);
        expect(rows[0].FMID).toEqual(1000021);
        spy.mockRestore();
    })
})