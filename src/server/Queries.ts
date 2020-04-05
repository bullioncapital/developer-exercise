import { Client, QueryResult} from 'pg';
import { IServerConfig } from '../types/ServerConfig';

export enum EStatus {
    E_SUCCESS = "success",
    E_FAIL = "failure"
}

export interface IQueryResData<T> {
    status: EStatus,
    message: string,
    data: T
}

export interface ICountDataRes {
    timeStamp: string, 
    count: number
}

export interface IGetCountQueryResult extends IQueryResData<Array<ICountDataRes>>{};

export class Queries {
    private _client: Client;
    constructor(config: IServerConfig) {
        this._client = new Client(config.dbConfig);
    }
    public createQuery(queryString: string): Promise<QueryResult> {
        return new Promise((resolve, reject) => {
            this._client.query(queryString).then(res => {
                resolve(res as QueryResult);
            }).catch(err => {
                reject(err as QueryResult);
            });
        });
    }
    public getCountQuery(): Promise<IQueryResData<ICountDataRes[]>> {
        return new Promise((resolve, reject) => {
            let formattedResponse = <IQueryResData<ICountDataRes[]>> {};
            this.createQuery("SELECT * FROM countdata ORDER BY timeStamp DESC").then(qRes => {
                let newRows = Array<ICountDataRes>();
                qRes.rows.forEach(row => {
                    newRows.push(<ICountDataRes>{
                        timeStamp: row['timestamp'],
                        count: row['count']
                    });
                });
                formattedResponse.status = EStatus.E_SUCCESS;
                formattedResponse.data = newRows,
                resolve(formattedResponse);
            }).catch(qErr => {
                formattedResponse.status = EStatus.E_SUCCESS;
                formattedResponse.message = qErr;
                reject(formattedResponse);
            });
        });
    }
    public modifyCountQuery(num: string): Promise<IQueryResData<ICountDataRes[]>> {
        return new Promise((resolve, reject) => {
            let formattedResponse = <IQueryResData<ICountDataRes>> {};
            this.createQuery("INSERT INTO countdata (timeStamp, count) VALUES (CURRENT_TIMESTAMP, "+ num.toString() +");").then(qRes => {
                if(qRes) {
                    this.getCountQuery().then(countRes => {
                        resolve(countRes);
                    }).catch(countErr => {
                        reject(countErr);
                    });
                }
            }).catch(qErr => {
                formattedResponse.status = EStatus.E_SUCCESS;
                formattedResponse.message = qErr;
                reject(formattedResponse);
            });
        });
    }
    
    public connectToDb(): Promise<boolean> {
        return new Promise((resolve) => {
            this._client.connect().then(() => {
                console.log('connected to database!');
                resolve(true);
            }).catch(err => {
                console.log("Could not connect to server, ensure postgres is installed and running. Schema can be created from ./DB_SCHEMA.pgsql. Update ./src/server/config.json with your database settings.");
                console.log("Switching to temporary storage, data will only last as long as the Application Server is running");
                resolve(false);
            });
        });
    }

    public disconnect() {
        this._client.end(err => {
            console.log('client has disconnected')
            if (err) {
              console.log('error during disconnection', err.stack);
            }
        });
    }
}