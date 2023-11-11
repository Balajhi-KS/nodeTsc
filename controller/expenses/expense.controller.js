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
exports.Expense = void 0;
const express_1 = __importDefault(require("express"));
const expense_service_1 = require("../../services/expenses/expense.service");
// import { GlobalFunction } from '../../globalfunction';
const globalfunction_1 = require("../../globalfunction");
class Expense {
    constructor() {
        this.createCategorys = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let err, success;
            if (req && req.body) {
                [err, success] = yield (0, globalfunction_1.to)(this.expenseSevices.createCategory(req.body));
            }
            if (err)
                return (0, globalfunction_1.ReE)(res, err, 422);
            return (0, globalfunction_1.Reponse)(res, { success: "success" }, 200);
        });
        this.express = (0, express_1.default)();
        this.router = express_1.default.Router();
        this.expenseSevices = new expense_service_1.ExpenseSevices();
    }
    get routes() {
        // passport.authenticate('jwt', { session: false }),
        this.router.post('/add', this.createCategorys);
        return this.router;
    }
}
exports.Expense = Expense;
;
