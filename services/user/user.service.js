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
exports.UserSevices = void 0;
const globalfunction_1 = require("../../globalfunction");
const models_1 = require("../../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserSevices {
    constructor() {
        this.userModel = models_1.dbInstance.user;
        /**
         * Create New user
         * @param body
         * @returns
         */
        this.registerUser = (body) => __awaiter(this, void 0, void 0, function* () {
            let createRandomErr, createRandomId, userErr, user;
            [createRandomErr, createRandomId] = yield (0, globalfunction_1.to)(this.createRandomUserId({ firstName: body.firstName, lastName: body.lastName }));
            let data = {
                firstName: body.firstName,
                lastName: body.lastName,
                userId: createRandomId,
                email: body.email,
                phone: body.phone,
                password: body.password
            };
            [userErr, user] = yield (0, globalfunction_1.to)(this.userModel.create(data));
            if (userErr)
                return userErr;
            return user;
        });
        /**
         * Create Random user id
         * @param req
         * @param res
         */
        this.createRandomUserId = (name) => __awaiter(this, void 0, void 0, function* () {
            let randomUserId;
            let checkUserIdAleadyExistErr, checkUserIdAleadyExist;
            let i;
            while (i != 0) {
                randomUserId = (name.firstName + name.lastName + '_' + Math.floor(Math.random() * 10000)).toLocaleLowerCase();
                [checkUserIdAleadyExistErr, checkUserIdAleadyExist] = yield (0, globalfunction_1.to)(this.checkAleadyExist(randomUserId));
                if (checkUserIdAleadyExistErr) {
                    return checkUserIdAleadyExistErr;
                }
                if (checkUserIdAleadyExist == null) {
                    break;
                }
            }
            return randomUserId;
        });
        this.checkAleadyExist = (userId) => __awaiter(this, void 0, void 0, function* () {
            let checkUserIdAleadyExistErr, checkUserIdAleadyExist;
            [checkUserIdAleadyExistErr, checkUserIdAleadyExist] = yield (0, globalfunction_1.to)(this.userModel.findOne({ where: { userId: userId } }));
            if (checkUserIdAleadyExistErr)
                return checkUserIdAleadyExistErr;
            return checkUserIdAleadyExist;
        });
        this.loginUser = (body) => __awaiter(this, void 0, void 0, function* () {
            const authenticatedUser = yield this.userModel.authenticate(body.userName, body.password);
            if (authenticatedUser) {
                let expiration_time = parseInt('15000');
                let jwtToken = jsonwebtoken_1.default.sign(authenticatedUser, 'key', { expiresIn: expiration_time });
                return jwtToken;
            }
            return null;
        });
    }
}
exports.UserSevices = UserSevices;
