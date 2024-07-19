import { Transaction } from "sequelize";

interface createExpense {
  Spend: number;
  Balance: number;
  Reason: string;
  categoryId: number;
}
interface planingAmount {
  planingAmount: number;
  categoryId?: number;
  userId?:number
}
interface createCategoryInter{
  categoryName:string;
  categoryImage:string;
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
    categoryImage: string;
  };
}

interface categoryCondition{
  transaction?:Transaction;
  whereCondition?:createCategoryInter
}

export { createExpense, planingAmount, createCategoryInter, createExpensePlaningInter,createCategoryMappingTnter,categoryCondition };
