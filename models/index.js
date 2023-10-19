"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// import { Sequelize } from 'sequelize-typescript';
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const path_1 = __importDefault(require("path"));
var basename = path_1.default.basename(__filename);
console.log('kjdfkjshd');
var db = {};
const sequelize = new sequelize_1.Sequelize({
    database: config_1.CONFIG.db_name,
    username: config_1.CONFIG.db_user,
    password: config_1.CONFIG.db_password,
    host: config_1.CONFIG.db_host,
    dialect: config_1.CONFIG.db_dialect,
    port: 5432,
    logging: false,
    define: {
        timestamps: false,
        underscored: true,
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        useUTC: true,
    }
});
exports.sequelize = sequelize;
