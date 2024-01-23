interface createExpense {
     Spend: number,
     Balance: number,
     Reason: string,
     categoryId:number,
}
interface planingAmount {
     planingAmount:number,
     categoryId:number,
}
export { createExpense ,planingAmount}