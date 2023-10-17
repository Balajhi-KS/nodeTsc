"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../config/config");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: config_1.CONFIG.db_name,
    username: config_1.CONFIG.db_user,
    password: config_1.CONFIG.db_password,
    host: config_1.CONFIG.db_host,
    dialect: config_1.CONFIG.db_dialect,
    port: 3306,
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
