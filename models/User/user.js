'use strict';
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
const sequelize_1 = require("sequelize");
const globalfunction_1 = require("../../globalfunction");
const bcrypt_1 = __importDefault(require("bcrypt"));
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            console.log(models, 'modelllllll');
            // User.belongsTo(models.User, { foreignKey: 'UserId' });
            //    User.hasMany(models.expenses,{foreignKey:'UserId'});
            //    User.hasMany(models.UserPlaningAmount,{foreignKey:'UserId'});
        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.STRING,
            //  allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created: {
            type: DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        modified: {
            type: DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'User',
        schema: "User",
        tableName: 'users',
        underscored: true,
    });
    User.beforeSave((user, options) => __awaiter(void 0, void 0, void 0, function* () {
        let err;
        if (user.changed('password')) {
            let salt, hash;
            let rounds = Math.floor(Math.random() * 6 + 4);
            [err, salt] = yield (0, globalfunction_1.to)(bcrypt_1.default.genSalt(rounds));
            if (err) {
                console.log(err.message);
            }
            [err, hash] = yield (0, globalfunction_1.to)(bcrypt_1.default.hash(user.password, salt));
            if (err) {
                console.log(err.message);
            }
            user.password = hash;
        }
    }));
    return User;
};
