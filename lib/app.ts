import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { getJsonFromCSV } from './csv_to_json'
import * as cors from 'cors'

class App {

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public app: express.Application;


  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors({
      origin: (origin: any, callback) => {
        callback(null, origin);
      },
      credentials: true
    }));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
      res.status(200).send(await getJsonFromCSV())
    });

    router.post('/', (req: Request, res: Response) => {
      const data = req.body;
      // query a database and save data
      res.status(200).send(data);
    });

    this.app.use('/', router)

  }

}

export default new App().app;