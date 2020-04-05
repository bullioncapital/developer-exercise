import { BaseServer } from './BaseServer';
import express from 'express';
import { Queries, IGetCountQueryResult, IQueryResData, EStatus, ICountDataRes } from './Queries';
import { Utilities } from '../utils/Utilities';
import bodyParser = require('body-parser');

class ApplicationServer extends BaseServer {
    private _q: Queries;
    private _connected: boolean;
    private _data: Array<ICountDataRes> = [];
    private _utils: Utilities = new Utilities();
    constructor() {
        super();
        this._q = new Queries(this.getConfig());
        this._data.push({
            timeStamp: this._utils.getCurrentDateTime(),
            count: 0
        } as ICountDataRes);
    }
    
    public connectToDb(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._q.connectToDb().then(res => {
                this._connected = res;
                resolve(res);
            }).catch(err => {
                this._connected = err;
                reject(err);
            });
        });
    }

    public startServer() {
        let app = this.getApp();
        let jsonParser = bodyParser.json();

        app.get(`/${this.getConfig().restApi.paths.getCount}`, (req: express.Request, res: express.Response) => {
            if(!this._connected) {
                let newRes = <IGetCountQueryResult> {
                    status: EStatus.E_SUCCESS,
                    message: "Data will expire on Application server resart, currently not connected to a database",
                    data: this._data
                }

                console.log(`${this.getConfig().restApi.paths.modifyCount}: ${JSON.stringify(newRes)}`);
                res.status(200).send(newRes);
            } else {
                this._q.getCountQuery().then(qRes => {
                    console.log(`${this.getConfig().restApi.paths.getCount}: ${JSON.stringify(qRes)}`);
                    res.status(200).send(qRes);
                }).catch(qErr => {
                    console.log(`${this.getConfig().restApi.paths.getCount}: ${JSON.stringify(qErr)}`);
                    res.status(500).send(qErr);
                });
            }
        });

        app.post(`/${this.getConfig().restApi.paths.modifyCount}`, jsonParser, (req: express.Request, res: express.Response) => {
            let reqBody = req.body as { value: number };
            if(!this._connected) {
                this._data.unshift({
                    timeStamp: this._utils.getCurrentDateTime(),
                    count: this._data[this._data.length - 1].count + reqBody.value
                } as ICountDataRes);

                let newRes = <IGetCountQueryResult> {
                    status: EStatus.E_SUCCESS,
                    message: "Data will expire on Application server resart, currently not connected to a database",
                    data: this._data
                }
                console.log(`${this.getConfig().restApi.paths.modifyCount}: ${JSON.stringify(newRes)}`);
                res.status(200).send(newRes);
            } else {
                if (reqBody) {
                    this._q.modifyCountQuery(reqBody.value.toString()).then(qRes => {
                        console.log(`${this.getConfig().restApi.paths.modifyCount}: ${JSON.stringify(qRes)}`);
                        res.status(200).send(qRes);
                    }).catch(qErr => {
                        console.log(`${this.getConfig().restApi.paths.modifyCount}: ${JSON.stringify(qErr)}`);
                        res.status(500).send(qErr);
                    });
                } else {
                    let nullRes = {
                        status: EStatus.E_FAIL,
                        message: "Incoming data is null"
                    } as IGetCountQueryResult;

                    console.log(`${this.getConfig().restApi.paths.modifyCount}: ${JSON.stringify(nullRes)}`);
                    res.status(500).send(JSON.stringify(nullRes));
                }
            }
        });

        app.listen(this.getConfig().restConfig.hostPort,
            () => console.log(`Application Server listening on ${this.getConfig().restConfig.hostPort}`));
    }
}

let server = new ApplicationServer();
server.connectToDb().then(res => {
    server.startServer();
});