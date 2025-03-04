import { body } from "express-validator";

const lenderValidator = {
    createLenderDetails: [
        body('name').notEmpty().isString().withMessage('Name must be a string')
    ],
    createLendingAmount: [
        body('amount').notEmpty().isString().withMessage('Amount must be Number'),
        body('isIncome').notEmpty().isBoolean().withMessage('Income must be boolean'),
        body('lenderId').notEmpty().isNumeric().withMessage('Id must be number')
    ],
}

export { lenderValidator };
