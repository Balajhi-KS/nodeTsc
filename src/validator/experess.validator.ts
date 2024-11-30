import { body } from "express-validator";

const expenseValidator = {
  createCategory: [
    body("categoryName")
      .isString()
      .withMessage("categoryName must be an String"),
    body("categoryIcon").isArray()
      .withMessage("categoryIcon must be an String"),
  ],
  createPlanningAmount: [
    body("planingAmount")
      .isNumeric()
      .withMessage("planingAmount must be an Number"),
    body("categoryId")
    .isNumeric()
    .withMessage("categoryId must be an Number"),
  ],
  createDailyExpense:[
    body('spendAmount').isNumeric().withMessage('spendAmount is invalid'),
    body('reason').isString().withMessage('reason is invalid'),
    body('categoryIcon').isNumeric().withMessage('categoryIcon is invalid'),
  ]
};

export { expenseValidator };
