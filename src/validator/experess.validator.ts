import { body } from "express-validator";

const expenseValidator = {
  createCategory: [
    body("categoryName")
      .isString()
      .withMessage("categoryName must be an String"),
    body("categoryImage")
      .isString()
      .withMessage("categoryImage must be an String"),
  ],
  createPlanningAmount: [
    body("planingAmount")
      .isNumeric()
      .withMessage("planingAmount must be an Number"),
    body("categoryId")
    .isNumeric()
    .withMessage("categoryId must be an Number"),
  ],
};

export { expenseValidator };
