// var express = require('express');
import express, {
  Request,
  Response,
  NextFunction
} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Routes } from "./routes/v1";
import * as dotenv from "dotenv";

import { sequelize } from "./models";
import { CONFIG } from "./config/config";
import helmet from "helmet";
import { passport } from "./middleware/passport";
import { UserVerify } from "./middleware/userVerify";
import logger from "morgan";

dotenv.config();
class App {
  public express: express.Application;
  public userVerify: UserVerify;

  // public routes: Routes;
  constructor() {
    this.express = express();
    this.express.use(cors());
    this.express.use(helmet());
    this.userVerify = new UserVerify();
    console.log(this.userVerify);
    this.mountRoutes();
  }
  private mountRoutes(): void {
    this.express.use(passport.initialize());
    // this.express.use(passport.session());
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json({ limit: "10mb" }));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use((req: any, res: Response, next: NextFunction) => {
      console.log(this.userVerify, "this.userVerify");
      if (req && req.headers && req.headers.authorization) {
        const token = this.userVerify.checkUseToken(req.headers.authorization);
        req.headers.authorization = token?.jwtToken;
        req["userToken"] = token?.id;
      }
      next();
    });
    this.express.use(function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, content-type, Authorization, Content-Type"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      next();
    });

    this.express.use("/v1", new Routes().routers);
    console.log(process.env.PORT, this.express.get("host"));

    sequelize
      .sync()
      .then(() => {
        console.log("Connected to SQL database:", CONFIG.db_name);
      })
      .catch((err) => {
        console.error(
          "Unable to connect to SQL database:",
          CONFIG.db_name,
          err.message
        );
      });
    const host: string = "localhost";
    const port: number = +(process.env.PORT as string);
    this.express.listen(3000, () => {
      console.log(`Listening to ${port} ${host}`);
    });
  }
}
export = new App().express;
