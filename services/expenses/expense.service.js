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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseSevices = void 0;
// import { GlobalFunction } from "../../globalfunction";
const globalfunction_1 = require("../../globalfunction");
const models_1 = require("../../models"); // Update the path to the correct location
// import { Expenses } from '../../models/expenses'; // Update the path to the correct location
// const { Category } = require('./models');
// import { Category } from '../../models' as any;
const sequelize_1 = require("sequelize");
class ExpenseSevices {
    constructor() {
        this.categoryModel = models_1.dbInstance.category;
        this.expensesModel = models_1.dbInstance.expenses;
        this.categoryPlaningAmount = models_1.dbInstance.categoryPlaningAmount;
        // constructor(){
        // }
        this.createCategory = (data) => __awaiter(this, void 0, void 0, function* () {
            let createCategoryErr, createCategorySuccess;
            [createCategoryErr, createCategorySuccess] = yield (0, globalfunction_1.to)(this.categoryModel.create(data));
            if (createCategoryErr) {
                console.log('createCategoryErr', createCategoryErr);
                return (0, globalfunction_1.TE)(createCategoryErr.message, true);
            }
            return createCategorySuccess;
        });
        this.getAllCategory = (userId) => __awaiter(this, void 0, void 0, function* () {
            let createCategoryErr, createCategorySuccess;
            [createCategoryErr, createCategorySuccess] = yield (0, globalfunction_1.to)(this.categoryModel.findAll({
                where: { [sequelize_1.Op.or]: [{ userId: userId }, { userId: null }] },
                attributes: ['id', 'categoryName', 'categoryImage']
            }));
            if (createCategoryErr) {
                console.log('createCategoryErr', createCategoryErr);
                return (0, globalfunction_1.TE)(createCategoryErr.message, true);
            }
            return createCategorySuccess;
        });
        this.createDailyExpenses = (data) => __awaiter(this, void 0, void 0, function* () {
            let createCategoryErr, createCategorySuccess;
            [createCategoryErr, createCategorySuccess] = yield (0, globalfunction_1.to)(this.expensesModel.create(data));
            if (createCategoryErr) {
                console.log('createCategoryErr', createCategoryErr);
                return (0, globalfunction_1.TE)(createCategoryErr.message, true);
            }
            return createCategorySuccess;
        });
        this.createExpensePlaning = function (data) {
            return __awaiter(this, void 0, void 0, function* () {
                let createExpensePlaningErr, createExpensePlaningSuccess;
                [createExpensePlaningErr, createExpensePlaningSuccess] = yield (0, globalfunction_1.to)(this.categoryPlaningAmount.create(data));
                if (createExpensePlaningErr)
                    return this.TE(createExpensePlaningErr.message);
                return createExpensePlaningSuccess;
            });
        };
        this.getAllExpenses = (userId) => __awaiter(this, void 0, void 0, function* () {
            let getExpensesErr, getExpensesSuccess;
            [getExpensesErr, getExpensesSuccess] = yield (0, globalfunction_1.to)(this.expensesModel.findAll({
                where: { userId: userId },
                attributes: ['id', 'spend', 'balance', 'reason'],
                include: {
                    model: this.categoryModel,
                    where: { [sequelize_1.Op.or]: [{ userId: userId }, { userId: null }] },
                    attributes: ['id', 'categoryName', 'categoryImage'],
                    include: {
                        model: this.categoryPlaningAmount,
                        where: { userId: userId },
                        attributes: ['id', 'planingAmount']
                    }
                }
            }));
            if (getExpensesErr) {
                console.log('getExpensesErr', getExpensesErr);
                return (0, globalfunction_1.TE)(getExpensesErr.message, true);
            }
            return getExpensesSuccess;
        });
    }
}
exports.ExpenseSevices = ExpenseSevices;
