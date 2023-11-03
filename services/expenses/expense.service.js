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
class ExpenseSevices {
    constructor() {
        this.categoryModel = models_1.dbInstance.category;
        // constructor(){
        // }
        this.createCategory = (data) => __awaiter(this, void 0, void 0, function* () {
            // console.log('dkjfhsk',dbInstance);
            let createCategoryErr, createCategorySuccess;
            console.log(data, 'jdfkjshdkjfhs');
            [createCategoryErr, createCategorySuccess] = yield (0, globalfunction_1.to)(this.categoryModel.create(data));
            if (createCategoryErr)
                return (0, globalfunction_1.TE)(createCategoryErr.message, true);
            return createCategorySuccess;
            // return '';
        });
        // createExpense = async function (data) {
        //      let createCategoryErr, createCategorySuccess;
        //      console.log(data,'fhgsjh');
        //      [createCategoryErr, createCategorySuccess] = await this.to(expenseModel.create(data));
        //      if (createCategoryErr) return this.TE(createCategoryErr.message);
        //      return createCategorySuccess;
        // }
    }
}
exports.ExpenseSevices = ExpenseSevices;
