import { exec, ChildProcess } from 'child_process';

export class App {
    private _webserver: ChildProcess;
    private _appServer: ChildProcess;
    
    public killWebServer() {
        this._webserver.kill("SIGINT");
    }

    public createWebServer() {
        this._webserver = exec('ts-node --project ./src/server/tsconfig.json ./src/server/WebServer.ts', (error, stdout, stderr) => {
            if (error) {
                console.error(`WEBSERVER|exec error: ${error}`);
              return;
            }
            console.log(`WEBSERVER| stdout: ${stdout}`);
            console.error(`WEBSERVER| stderr: ${stderr}`);
        });
        
        this._webserver.stdout.on('data', function(data) {
            console.log("WEBSERVER| " + data);
        });
        
        this._webserver.stdout.on('error', function(error) {
            console.log("WEBSERVER| " + error)
        });
    }

    public killAppServer() {
        this._appServer.kill("SIGINT");
    }

    public createAppServer() {
        this._appServer = exec('ts-node --project ./src/server/tsconfig.json ./src/server/ApplicationServer.ts', (error, stdout, stderr) => {
            if (error) {
                console.error(`APPSERVER|exec error: ${error}`);
              return;
            }
            console.log(`APPSERVER| stdout: ${stdout}`);
            console.error(`WEBSERVER| stderr: ${stderr}`);
        });
        
        this._appServer.stdout.on('data', function(data) {
            console.log("APPSERVER| " + data);
        });
        
        this._appServer.stdout.on('error', function(error) {
            console.log("APPSERVER| " + error)
        });
    }

}