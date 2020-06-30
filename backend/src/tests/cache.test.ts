import FmCache from "../service/FmCache";

describe("cache", () => {
    let cache: FmCache = null;
    beforeEach(() => {
        cache = new FmCache();
    })
    it("should be able to get value by key", () => {
        cache.update(1, 'a');
        expect(cache.get(1)).toEqual('a');
    });
    it("should return null when cache missed", () => {
        expect(cache.get(1)).toEqual(null);
    });
    it("should return null if cache expired", () => {
        cache = new FmCache(0);
        cache.update(1, 'a');
        expect(cache.get(1)).toEqual(null);
    });
})