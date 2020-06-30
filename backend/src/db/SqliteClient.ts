import {Database} from "sqlite3";
import MyError from '../MyError';

class SqliteClient {
    private static db: Database = null;

    public static async init(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                return resolve();
            }
            let db = new Database("db", err => {
                if (err) {
                    return reject(err);
                }
                this.db = db;
                return resolve();
            });
        });
    }

    public static async close(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return resolve();
            }
            this.db.close(err => {
                if (err) {
                    return reject(err);
                }
                this.db = null;
                return resolve();
            });
        });
    }

    public static each(sql: string, params: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new MyError(500, 'db not connected yet'));
            }
            const rows: any[] = [];
            this.db.each(sql, params, (err: Error | null, row: any) => {
                if (err) {
                    return reject(err);
                }
                rows.push(row);
            }, (err: Error | null, count: number) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }
    public static get(sql: string, params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new MyError(500, 'db not connected yet'));
            }
            this.db.get(sql, params, (err: Error | null, row: any) => {
                if (err) {
                    return reject(err);
                }
                return resolve(row);
            })
        })
    }
}

export default SqliteClient;

