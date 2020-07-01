import express from "express";
import {Application, Request, Response, NextFunction} from "express";
const cors = require("cors");
import HomeController from "./routes/Home";
import MyError from "./MyError";
import SqliteClient from "./db/SqliteClient";

class Server {
    private readonly app: Application;
    private homeController: HomeController;

    constructor() {
        SqliteClient.init().then();
        this.app = express();

        this.homeController = new HomeController();
        this.app.use(cors());
        this.app.use(this.homeController.router);

        // error handler
        this.app.use(this.errorHandler.bind(this));
    }

    private errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        let status = 500;
        if (err instanceof MyError)
            status = err.status;
        res.status(status).json({
            status: status,
            message: err.message
        });
    }

    public start(port: number): void {
        this.app.listen(port);
    }
    get App(): Application {
        return this.app;
    }
}

export default Server;