import * as express from 'express';
import {NextFunction, Request, Response, Router} from "express";
import FmService from '../service/FmService';

class HomeController {
    private readonly _router: Router;
    private readonly service: FmService;

    constructor() {
        this.service = new FmService();
        this._router = express.Router()
        this._router.get('/',(req: Request, res: Response) => {
            return res.send('Welcome!');
        });
        this._router.get('/data', this.dataHandler.bind(this));
    }
    get router(): Router {
        return this._router;
    }
    private async dataHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const fmidStr = req.query.fmid;
            const pageSizeStr = req.query.pagesize;
            let fmid = 1, pageSize = 20;
            if (fmidStr && typeof fmidStr === 'string')
                fmid = parseInt(fmidStr);
            if (pageSizeStr && typeof pageSizeStr === 'string')
                pageSize = parseInt(pageSizeStr);

            const data = await this.service.paginate(fmid, pageSize);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

export default HomeController;