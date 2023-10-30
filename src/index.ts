// var express = require('express');
import express, { Application, Request, Response, NextFunction, Router, Express } from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import { Routes } from './routes/v1';
import * as dotenv from 'dotenv';

import { sequelize } from './models';
import { CONFIG } from './config/config';
import helmet from 'helmet';
import passport from 'passport';
import logger from 'morgan';

dotenv.config();
class App {
    public express: express.Application;

    // public routes: Routes;
    constructor() {
        this.express = express();
        this.mountRoutes();
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(helmet());
        this.express.use(passport.initialize());
        this.express.use(logger('dev'));
    }
    private mountRoutes(): void {
        this.express.use(function (req: Request, res: Response, next: NextFunction) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });

        this.express.use('/v1', new Routes().routers);
        console.log(process.env.PORT, this.express.get('host'));

        sequelize.sync({ force: true }).then(() => {
            console.log('Connected to SQL database:', CONFIG.db_name);
        }).catch(err => {
            console.error('Unable to connect to SQL database:', CONFIG.db_name, err.message);
        });
        const host: string = 'localhost';
        const port: number = +process.env.PORT;
        this.express.listen(3000,host, () => { console.log(`Listening to ${port} ${host}`) });
    }
}
module.exports = new App().express;