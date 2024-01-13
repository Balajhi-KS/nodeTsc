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
const passport_1 = __importDefault(require("passport"));
const experess_validator_1 = require("../../validator/experess.validator");
const validate_schema_1 = require("../../middleware/validate-schema");
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
        this.getAllCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let err, success;
            if (req) {
                [err, success] = yield (0, globalfunction_1.to)(this.expenseSevices.getAllCategory());
            }
            if (err)
                return (0, globalfunction_1.ReE)(res, err, 422);
            return (0, globalfunction_1.Reponse)(res, { success: success }, 200);
        });
        this.createDailyExpenses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let err, success, body;
            if (req && req.body) {
                body = req.body;
                let data = {
                    spend: body === null || body === void 0 ? void 0 : body.Spend,
                    balance: body === null || body === void 0 ? void 0 : body.Balance,
                    reason: body === null || body === void 0 ? void 0 : body.Reason
                };
                [err, success] = yield (0, globalfunction_1.to)(this.expenseSevices.createDailyExpenses(data));
            }
            if (err)
                return (0, globalfunction_1.ReE)(res, err, 422);
            return (0, globalfunction_1.Reponse)(res, { success: "Daily Expenses created successfully" }, 200);
        });
        this.express = (0, express_1.default)();
        this.router = express_1.default.Router();
        this.expenseSevices = new expense_service_1.ExpenseSevices();
    }
    get routes() {
        // passport.authenticate('jwt', { session: false }),
        this.router.post('/category', experess_validator_1.expenseValidator.createCategory, validate_schema_1.validate, passport_1.default.authenticate('jwt', { session: false }), this.createCategorys);
        this.router.get('/category', passport_1.default.authenticate('jwt', { session: false }), this.getAllCategory);
        this.router.post('/daily/expenses', passport_1.default.authenticate('jwt', { session: false }), this.createDailyExpenses);
        return this.router;
    }
}
exports.Expense = Expense;
;
