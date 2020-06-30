import supertest from 'supertest';
import Server from '../Server';

describe('api', () => {
    let server: Server = null;
    beforeAll(() => {
        server = new Server();
    });
    it("should be able to get response when accessing root", async () => {
        await supertest(server.App)
            .get('/')
            .expect(200);
    });
    it("should be able to query for data without params", async () => {
        const resp = await supertest(server.App)
            .get('/data')
            .expect(200);
        expect(resp.body.length).toEqual(20);
        expect(resp.body[0].FMID).toEqual(1000001);
    });
    it("should be able to backward query", async () => {
        const resp = await supertest(server.App)
            .get('/data?fmid=1000016&pagesize=-5')
            .expect(200);
        expect(resp.body.length).toEqual(5);
        expect(resp.body.map((r:any) => r.FMID)).toEqual(
            [1000011, 1000013, 1000014, 1000015, 1000016]);
    });
})