"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// var express = require('express');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const v1_1 = require("./routes/v1");
const dotenv = __importStar(require("dotenv"));
const models_1 = require("./models");
const config_1 = require("./config/config");
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = require("./middleware/passport");
const morgan_1 = __importDefault(require("morgan"));
dotenv.config();
class App {
    // public routes: Routes;
    constructor() {
        this.express = (0, express_1.default)();
        this.express.use((0, cors_1.default)());
        this.express.use((0, helmet_1.default)());
        this.mountRoutes();
    }
    mountRoutes() {
        this.express.use(passport_1.passport.initialize());
        // this.express.use(passport.session());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(body_parser_1.default.json({ limit: '10mb' }));
        this.express.use(body_parser_1.default.urlencoded({ extended: true }));
        this.express.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
        this.express.use('/v1', new v1_1.Routes().routers);
        console.log(process.env.PORT, this.express.get('host'));
        models_1.sequelize.sync().then(() => {
            console.log('Connected to SQL database:', config_1.CONFIG.db_name);
        }).catch(err => {
            console.error('Unable to connect to SQL database:', config_1.CONFIG.db_name, err.message);
        });
        const host = 'localhost';
        const port = +process.env.PORT;
        this.express.listen(3000, host, () => { console.log(`Listening to ${port} ${host}`); });
    }
}
module.exports = new App().express;
