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
exports.User = void 0;
const express_1 = __importDefault(require("express"));
const user_service_1 = require("../../services/user/user.service");
const globalfunction_1 = require("../../globalfunction");
class User {
    /**
     * Init declaration
     */
    constructor() {
        /**
         * Register new user
         * @param req body data
         * @param res success message
         * @returns success message
         */
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let err, success;
            if (req && req.body) {
                [err, success] = yield (0, globalfunction_1.to)(this.UserSevices.registerUser(req.body));
            }
            if (err)
                return (0, globalfunction_1.ReE)(res, { message: 'Unable to Register User' }, 422);
            return (0, globalfunction_1.Reponse)(res, { success: "User Created successfully" }, 200);
        });
        /**
         * Register new user
         * @param req body data
         * @param res success message
         * @returns success message
         */
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let err, success;
            if (req && req.body) {
                [err, success] = yield (0, globalfunction_1.to)(this.UserSevices.loginUser(req.body));
                if (err)
                    return (0, globalfunction_1.ReE)(res, err, 422);
                ;
                if (success) {
                    return (0, globalfunction_1.Reponse)(res, { success }, 200);
                }
                return (0, globalfunction_1.ReE)(res, { message: 'invalid Username or password' }, 401);
            }
        });
        this.express = (0, express_1.default)();
        this.router = express_1.default.Router();
        this.UserSevices = new user_service_1.UserSevices();
    }
    /**
     * Access router
     */
    get routes() {
        this.router.post('/register', this.registerUser);
        this.router.post('/login', this.loginUser);
        this.router.get('/temp', (req, res) => {
            res.send(`Hello`);
        });
        return this.router;
    }
}
exports.User = User;
