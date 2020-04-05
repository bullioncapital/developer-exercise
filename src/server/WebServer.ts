
import express from 'express';
import * as path from 'path';
import { BaseServer } from './BaseServer';

class WebServer extends BaseServer {
    private _rootPath: string;

    constructor() {
        super();
        this._rootPath = path.resolve(__dirname + '../../../');
    }

    public startServer() {
        let app = this.getApp();
        app.use("/bullioncapital/developer-exercise/static/", express.static(this._rootPath + '/build/static/'));
        app.use("/bullioncapital/developer-exercise/static/css", express.static(this._rootPath + '/build/static/css/'));
        app.use("/bullioncapital/developer-exercise/static/js", express.static(this._rootPath + '/build/static/js/'));
        
        app.get('/', (req: express.Request, res: express.Response) => {
            console.log(`User connected from ${req.url}`);
            res.sendFile(this._rootPath + "/build/index.html");
        });
        
        app.listen(this.getConfig().webServerConfig.hostPort, 
            () => console.log(`Webserver listening on ${this.getConfig().webServerConfig.hostPort}`));        
    }
}

new WebServer().startServer();