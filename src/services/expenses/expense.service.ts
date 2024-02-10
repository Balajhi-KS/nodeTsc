// import { GlobalFunction } from "../../globalfunction";
import sequelize from 'sequelize';
import { TE, to, Reponse, ReE } from '../../globalfunction';
import { dbInstance } from '../../models'; // Update the path to the correct location
// import { Expenses } from '../../models/expenses'; // Update the path to the correct location
// const { Category } = require('./models');
// import { Category } from '../../models' as any;
import { Op, where } from 'sequelize';

export class ExpenseSevices {
     categoryModel: any = dbInstance.category;
     expensesModel: any = dbInstance.expenses;
     categoryPlaningAmount: any = dbInstance.categoryPlaningAmount;

     // constructor(){

     // }
     createCategory = async (data) => {
          let createCategoryErr:Error, createCategorySuccess;
          [createCategoryErr, createCategorySuccess] = await to(this.categoryModel.create(data));
          if (createCategoryErr) {
               console.log('createCategoryErr', createCategoryErr)
               return TE(createCategoryErr.message, true);
          }
          return createCategorySuccess;
     }

     getAllCategory = async (userId:number) => {
          let createCategoryErr:Error, createCategorySuccess;
          [createCategoryErr, createCategorySuccess] = await to(this.categoryModel.findAll({
               where: { [Op.or]: [{ userId: userId }, { userId: null }] },
               attributes: ['id', 'categoryName', 'categoryImage']
          }));
          if (createCategoryErr) {
               console.log('createCategoryErr', createCategoryErr)
               return TE(createCategoryErr.message, true);
          }
          return createCategorySuccess;
     }

     createDailyExpenses = async (data) => {
          let createCategoryErr:Error, createCategorySuccess;
          [createCategoryErr, createCategorySuccess] = await to(this.expensesModel.create(data));
          if (createCategoryErr) {
               console.log('createCategoryErr', createCategoryErr)
               return TE(createCategoryErr.message, true);
          }
          return createCategorySuccess;
     }
     createExpensePlaning = async function (data) {
          let createExpensePlaningErr, createExpensePlaningSuccess;
          [createExpensePlaningErr, createExpensePlaningSuccess] = await to(this.categoryPlaningAmount.create(data));
          if (createExpensePlaningErr) return this.TE(createExpensePlaningErr.message);
          return createExpensePlaningSuccess;
     }
     getAllExpenses = async (userId:number) => {
          let getExpensesErr: Error, getExpensesSuccess;

          [getExpensesErr, getExpensesSuccess] = await to(this.categoryModel.findAll({
               where: { [Op.or]: [{ userId: userId }, { userId: null }] },
               attributes: ['id', 'categoryName', 'categoryImage',[sequelize.fn('sum', sequelize.col('spend')), 'total_amount']],
               include: [{
                    required:false,
                    model: this.expensesModel,
                    attributes: ['id', 'spend', 'balance', 'reason'],
                 },{
                    model: this.categoryPlaningAmount,
                    required:false,
                    where: { userId: userId },
                    attributes: ['id', 'planingAmount']
               }],
               group: ['Category.id','CategoryPlans.id' ,'Category.category_name', 'Category.category_image', 'Expenses.id', 'Expenses.spend', 'Expenses.balance', 'Expenses.reason']
          }));
          if (getExpensesErr) {
               console.log('getExpensesErr', getExpensesErr)
               return TE(getExpensesErr.message, true);
          }
          return getExpensesSuccess;
     }
}