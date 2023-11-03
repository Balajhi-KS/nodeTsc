// import { GlobalFunction } from "../../globalfunction";
import {TE, to, Reponse, ReE } from '../../globalfunction';
import { dbInstance } from '../../models'; // Update the path to the correct location
// import { Expenses } from '../../models/expenses'; // Update the path to the correct location
// const { Category } = require('./models');
// import { Category } from '../../models' as any;


export class ExpenseSevices{
     categoryModel:any = dbInstance.category;

     // constructor(){

     // }
     createCategory = async (data) => {
          // console.log('dkjfhsk',dbInstance);
          
          let createCategoryErr, createCategorySuccess;
               console.log(data,'jdfkjshdkjfhs');
          [createCategoryErr, createCategorySuccess] = await to(this.categoryModel.create(data));
          if (createCategoryErr) return TE(createCategoryErr.message,true);
          return createCategorySuccess;
          // return '';
     }
     // createExpense = async function (data) {
     //      let createCategoryErr, createCategorySuccess;
     //      console.log(data,'fhgsjh');
     //      [createCategoryErr, createCategorySuccess] = await this.to(expenseModel.create(data));
     //      if (createCategoryErr) return this.TE(createCategoryErr.message);
     //      return createCategorySuccess;
     // }
}