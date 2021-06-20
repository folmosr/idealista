import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv';
import { Routes } from './routes';
import { WinstonLogger } from '../winston-logger';

dotenv.config();

class App {
  public server: Application;
  public appRoutes: Routes = new Routes();
  public log: WinstonLogger = new WinstonLogger();
  private BASE_PATH: string = process.env.BASE_PATH || '/api';
  private swaggerDocument = YAML.load('./docs/swagger.yaml');

  constructor() {
    this.server = express();
    this.config();
  }

  private config(): void {
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    if (process.env.NODE_ENV !== 'production') {
      this.server.use(`${this.BASE_PATH}/docs`, swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
    }
    this.server.use(this.BASE_PATH, this.appRoutes.routes());
    this.log.initializer();
  }
}

export default new App().server;
