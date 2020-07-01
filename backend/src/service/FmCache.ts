/**
 * A simple hand made cache service
 * Should be replaced with redis or memcache in production
 */
type CacheObject = {
    expireAt: Date,
    val: []
}

class FmCache {
    private readonly cache: { [key: number]: CacheObject };
    private readonly expireInHours: number = 10;    //  ttl 10 hours by default

    constructor(expireInHours?: number) {
        this.cache = {};
        if (expireInHours >= 0)
            this.expireInHours = expireInHours;
    }
    public get(fmid: number): any {
        const item = this.cache[fmid];
        if (item &&
            new Date(item.expireAt) > new Date()) {
            return item.val;
        }

        return null;
    }
    public update(fmid: number, val: any): void {
        const expireAt = new Date();
        expireAt.setHours(expireAt.getHours() + this.expireInHours);
        this.cache[fmid] = {
            expireAt: expireAt,
            val: val
        }
    }
    public invalidate(fmid: number): boolean {
        return delete this.cache[fmid];
    }
}

export default FmCache;