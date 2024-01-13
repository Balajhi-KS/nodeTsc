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
const crypto_1 = __importDefault(require("crypto"));
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            console.log(models);
            User.hasMany(models.userLoginDetails, { foreignKey: 'userId' });
        }
    }
    User.authenticate = function (email, password) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({
                where: { email },
                attributes: ['id', 'firstName', 'lastName', 'userId', 'email', 'phone', 'password']
            });
            this.checkPassword = (_a = user === null || user === void 0 ? void 0 : user.dataValues) === null || _a === void 0 ? void 0 : _a.password;
            this.salt = this.checkPassword.slice(0, 16);
            if (user && this.checkPassword && this.salt) {
                let hash;
                hash = crypto_1.default.createHash('sha256');
                hash.update(password + this.salt);
                if (this.checkPassword === (this.salt + hash.digest('hex'))) {
                    (_b = user === null || user === void 0 ? void 0 : user.dataValues) === null || _b === void 0 ? true : delete _b.password;
                    return user === null || user === void 0 ? void 0 : user.dataValues;
                }
            }
            return null;
        });
    };
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
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
        if (user.changed('password')) {
            let salt, hash;
            salt = crypto_1.default.randomBytes(8).toString('hex');
            hash = crypto_1.default.createHash('sha256');
            hash.update(user.password + salt);
            user.password = salt + hash.digest('hex');
        }
    }));
    return User;
};
