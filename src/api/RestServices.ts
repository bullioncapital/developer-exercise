import * as config from '../server/config.json';
import { IServerConfig } from '../types/ServerConfig';
import { IRequest } from '../types/Api';
import { IGetCountQueryResult } from './../server/Queries';

export class RestServices {
    private _config: IServerConfig;
    constructor() {
        this._config = config as IServerConfig;
    }

    private _createRequest(method: string, path: string, body?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`http://${this._config.restConfig.hostName}:${this._config.restConfig.hostPort}/${path}`, {
                method: method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: body,
            }).then(res => {
                if (res && res.status === 200) {
                    res.json().then(jsonResponse => {
                        resolve(jsonResponse);
                    });
                } else {
                    reject(res);
                }
            }, err => {
                reject(err);
            });
        });
    }

    public modifyCount(value: number): Promise<IGetCountQueryResult> {
        return new Promise((resolve, reject) => {
            let reqBody = {
                value: value
            } as IRequest;
            this._createRequest('POST', this._config.restApi.paths.modifyCount, JSON.stringify(reqBody)).then(res => {
                resolve(res as IGetCountQueryResult);
            }).catch(err => {
                reject(err as IGetCountQueryResult);
            })
        });
    }

    public getCount(): Promise<IGetCountQueryResult> {
        return new Promise((resolve, reject) => {
            this._createRequest('GET', this._config.restApi.paths.getCount).then(res => {
                resolve(<IGetCountQueryResult>(res));
            }).catch(err => {
                reject(err as IGetCountQueryResult);
            })
        });
    }
}