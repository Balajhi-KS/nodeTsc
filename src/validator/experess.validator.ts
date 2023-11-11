import { body } from "express-validator";

const expenseValidator = {
     createCategory: [
          body('categoryName').isString().withMessage('categoryName must be an array'),
          body('categoryImage').isString().withMessage('categoryImage must be an array')

     ]
};

export { expenseValidator };