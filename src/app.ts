import express from "express";
import bearerToken from "express-bearer-token";
import cors from "cors";
import morgan from "morgan";
import { createConnection } from "typeorm";

import { httpLogStream, logger } from "./resources/logger";
import { serviceDocsRouter, serviceRouter } from "./services";
import { attachIdentity } from "./middlewares";
import ormconfig from "./models/ormconfig";

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.connectMariaDB(); // connect to mariaDB
    this.initializeMiddlewares(); // initialize middlewares
    this.initializeMorgan(); // initialize morgan
    this.initializeRouter(); // initialize router
  }
  private initializeRouter() {
    this.app.use("/", serviceRouter);
    this.app.use("/docs", serviceDocsRouter);
  }
  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json()); // for parsing application/json
    this.app.use(
      bearerToken({
        headerKey: "Bearer",
        reqKey: "token",
      })
    );
    this.app.use(attachIdentity);
  }
  private async connectMariaDB() {
    await createConnection(ormconfig);
    logger.info(`MariaDB connected successfully`);
  }
  private initializeMorgan() {
    if (process.env.NODE_ENV === "prod") {
      this.app.enable("trust proxy");
    }
    const morganFormat = `HTTP/:http-version :method :remote-addr 
      :url :remote-user :status :res[content-length] 
      :referrer :user-agent :response-time ms`;

    this.app.use(morgan(morganFormat, { stream: httpLogStream }));
  }
}
export default App;
