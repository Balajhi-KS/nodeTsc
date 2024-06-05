interface createExpense {
  Spend: number;
  Balance: number;
  Reason: string;
  categoryId: number;
}
interface planingAmount {
  planingAmount: number;
  categoryId: number;
}
interface createCategoryInter{
  categoryName:string;
  categoryImage:string;
  planingAmount:string;
  userId:number;
}
interface createExpensePlaningInter{
  planingAmount:string;
  categoryId:string;
  userId:number;
}
interface createCategoryMappingTnter {
  dataValues: {
    id: number;
    categoryName: string;
    categoryImage: string;
  };
}
export { createExpense, planingAmount, createCategoryInter, createExpensePlaningInter,createCategoryMappingTnter };
