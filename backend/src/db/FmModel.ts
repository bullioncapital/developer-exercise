import db from '../db/SqliteClient';
const tbName = 'farmers_markets_from_usda';

class FmModel {
    public static async nextPageIds(startFmid: number, pageSize: number): Promise<number[]> {
        const query = "SELECT FMID FROM " + tbName +
            " WHERE FMID >= ? ORDER BY FMID LIMIT ?;";
        const rows = await db.each(query, [startFmid, pageSize]);
        return rows.map(row => Number(row.FMID));
    }
    public static async prevPageIds(endFmid: number, pageSize: number): Promise<number[]> {
        const query = "SELECT FMID FROM " + tbName +
            " WHERE FMID <= ? ORDER BY FMID DESC LIMIT ?;";
        const rows = await db.each(query, [endFmid, pageSize]);
        return rows.reverse().map(row => Number(row.FMID));
    }
    public static async getById(fmid: number): Promise<any> {
        const query = "SELECT * FROM " + tbName + " WHERE FMID = ?;";
        return await db.get(query, [fmid]);
    }
}

export default FmModel;