import db from '../db/SqliteClient';
import FmModel from "../db/FmModel";

describe("model", () => {
    beforeAll(async() => {
        await db.init();
    });
    afterAll(async() => {
        await db.close();
    })
    it("should be able to get by fmid", async() => {
        const row = await FmModel.getById(1000001);
        expect(row.FMID).toEqual(1000001);
    });
    it("should be able to get next page of data", async() => {
        const rows = await FmModel.nextPageIds(1, 5);
        expect(rows.length).toEqual(5);
        expect(rows).toEqual([1000001, 1000003, 1000007, 1000009, 1000010]);
    });
    it("should be able to get prev page of data", async() => {
        const rows = await FmModel.prevPageIds(1000016, 5);
        expect(rows.length).toEqual(5);
        expect(rows).toEqual([1000011, 1000013, 1000014, 1000015, 1000016]);
    });
})