"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// import { Sequelize } from 'sequelize-typescript';
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const config_1 = require("../config/config");
const contant_1 = require("../config/contant");
const fs_1 = __importDefault(require("fs"));
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
const schemaCreate = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // const test = [];
        var schemas = yield sequelize.showAllSchemas({}).then((s) => {
            contant_1.CONSTANT.SCHEMAS.forEach((item) => {
                if (s.indexOf(item) < 0) {
                    sequelize.createSchema(item, {}).then((res) => { });
                }
            });
        }, (err) => {
            console.log("in err", err);
        });
        return schemas;
    });
};
//    CONSTANT.SCHEMAS.forEach((item:string) => {
//      fs.readdirSync(__dirname + "/" + item)
//        .filter((file:string) => {
//          return (
//            file.indexOf(".") !== 0 &&
//            file !== basename &&
//            file.slice(-3) === ".js"
//          );
//        })
//        .forEach((file:string) => {
//          // console.log(file, "in file val");
//          // if (file.indexOf('users.js') >= 0) {
//          var model = require(path.join(__dirname + "/" + item, file)).default;
//          db[file.slice(0, -3)] = model(sequelize, DataTypes);
//          // }
//          // console.log('in db new', db);
//        });
//    });
contant_1.CONSTANT.SCHEMAS.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield fs_1.default.promises.readdir(path_1.default.join(__dirname, item));
    for (const file of files) {
        if (file.indexOf(".") !== 0 && file.slice(-3) === ".js") {
            const model = require(path_1.default.join(__dirname, item, file));
            if (model) {
                db[file.slice(0, -3)] = model(sequelize, sequelize_2.DataTypes);
            }
            console.log(db, model, 'djkhfjksd');
        }
    }
}));
Object.keys(db).forEach((modelName) => {
    // console.log(modelName, 'in model', db['addresses']);
    if (db[modelName].association) {
        db[modelName].association(db);
    }
});
db.schemaCreate = schemaCreate();
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
