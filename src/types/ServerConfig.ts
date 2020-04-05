export interface IServerConfig {
    restConfig: {
        hostName: string,
        hostPort: number
    },
    webServerConfig: {
        hostName: string,
        hostPort: number
    },
    dbConfig: {
        user: string,
        host: string,
        database: string,
        port: number
    },
    restApi: {
        paths: {
            modifyCount: string,
            getCount: string
        }
    }
}