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
exports.sequelize = exports.dbInstance = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config/config");
const contant_1 = require("../config/contant");
const sequelize_1 = require("sequelize");
var basename = path_1.default.basename(__filename);
const db = {};
const sequelize = new sequelize_1.Sequelize({
    database: config_1.CONFIG.db_name,
    username: config_1.CONFIG.db_user,
    password: config_1.CONFIG.db_password,
    host: config_1.CONFIG.db_host,
    dialect: config_1.CONFIG.db_dialect,
    port: 5432,
    logging: true,
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
            contant_1.CONSTANT.SCHEMAS.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                if (s.indexOf(item) < 0) {
                    yield sequelize.createSchema(item, {});
                }
            }));
        }, (err) => {
            console.log("in err", err);
        });
        return schemas;
    });
};
contant_1.CONSTANT.SCHEMAS.forEach((item) => {
    fs_1.default.readdirSync(path_1.default.join(__dirname, item))
        .filter((file) => {
        return (file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js");
    })
        .forEach((file) => {
        const model = require(path_1.default.join(__dirname, item, file))(sequelize, sequelize_1.DataTypes);
        db[file.slice(0, -3)] = model;
        // console.log('in db new', db);
    });
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        //  console.log(db[modelName], 'in model');
        db[modelName].associate(db);
    }
});
const dbInstance = Object.assign(Object.assign({}, db), { schemaCreates: () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield schemaCreate();
        return result;
    }), sequelize,
    Sequelize: sequelize_1.Sequelize });
exports.dbInstance = dbInstance;
// console.log('db',db)
dbInstance.schemaCreates();
