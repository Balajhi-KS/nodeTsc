import { body } from "express-validator";

const expenseValidator = {
  createCategory: [
    body("categoryName")
      .isString()
      .withMessage("categoryName must be an String"),
    body("categoryIcon").isObject()
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
    body('categoryId').isNumeric().withMessage('categoryId is invalid'),
    body('isIncome').isBoolean().withMessage('isIncome is invalid')
  ],
  transactionValidator : [
      body('*.isIncome')
        .isBoolean().withMessage('isIncome must be a boolean'),
      body('*.reason')
        .isString().notEmpty().withMessage('reason is required'),
      body('*.spend')
        .isString().withMessage('spend must be a number')
    ]
};

export { expenseValidator };
