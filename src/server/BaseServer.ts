import express = require('express');
import cors = require('cors');
import * as config from './config.json';
import { IServerConfig } from './../types/ServerConfig';

export class BaseServer {
    private _port: number;
    private _app: express.Application;
    private _config: IServerConfig;

    constructor() {
        this._config = <IServerConfig>(<any>config);
        this._port = this._config.webServerConfig.hostPort;
        this._app = express();
        this._app.use(cors());
    }
    
    public getApp(): express.Application {
        return this._app;
    }

    public getPort(): number {
        return this._port;
    }

    public getConfig(): IServerConfig {
        return this._config;
    }
}