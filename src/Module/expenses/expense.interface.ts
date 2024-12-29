import { Transaction } from "sequelize";

interface createExpense {
  spendAmount: number;
  Balance: number;
  reason: string;
  categoryId: number;
  id:number;
  isIncome?:boolean

}
interface planingAmount {
  planingAmount: number;
  categoryId?: number;
  userId?:number
}
interface createCategoryInter{
  categoryName:string;
  categoryIcon:JSON;
  userId?:number;
  id?:number;
}
interface createExpensePlaningInter extends createCategoryInter{
  planingAmount:number;
  categoryId?:string;
}
interface createCategoryMappingTnter {
  dataValues: {
    id: number;
    categoryName: string;
    categoryIcon: string;
  };
}

interface categoryCondition{
  transaction?:Transaction;
  whereCondition?:createCategoryInter
}

interface WhereCondition {
  [key: string]: any;
}
export { createExpense, planingAmount, createCategoryInter, createExpensePlaningInter, createCategoryMappingTnter, categoryCondition, WhereCondition };
