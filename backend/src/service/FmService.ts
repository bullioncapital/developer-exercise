import FmModel from "../db/FmModel";
import FmCache from "./FmCache";

class FmService {
    private readonly cache: FmCache;

    constructor() {
        this.cache = new FmCache();
    }
    private async getByIds(ids: number[]) {
        const rows = [];
        for await (const id of ids) {
            let row = this.cache.get(id);
            if (!row) {
                row = await FmModel.getById(id);
                this.cache.update(id, row);
            }
            rows.push(row);
        }

        return rows;
    }
    public async paginate(fmid: number, pageSize: number) {
        let ids: number[] = [];
        if (pageSize > 0) {
            ids = await FmModel.nextPageIds(fmid, pageSize);
        } else if (pageSize < 0) {
            ids = await FmModel.prevPageIds(fmid, -pageSize);
        }
        return await this.getByIds(ids);
    }
}

export default FmService;