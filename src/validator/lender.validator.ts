import { body, param, query } from "express-validator";

const lenderValidator = {
    getLenderDetails: [
        body('*').isEmpty().withMessage('body data not allowed'),
        query('*').isEmpty().withMessage('query data not allowed'),
        param('*').isEmpty().withMessage('query data not allowed'),
    ],
    createLenderDetails: [
        body('name').notEmpty().isString().withMessage('Name must be a string')
    ],
    createLendingAmount: [
        body('amount').notEmpty().isString().withMessage('Amount must be Number'),
        body('isIncome').notEmpty().isBoolean().withMessage('Income must be boolean'),
        body('lenderId').notEmpty().isNumeric().withMessage('Id must be number')
    ],
    getLenderAmountDetails: [
        query('id').isString().withMessage('Id must be a number'),
        param('*').isEmpty().withMessage('query data not allowed'),
        body('*').isEmpty().withMessage('body data not allowed')
    ],
    updateLendingAmount: [
        body('id').isNumeric().withMessage('Id must be a number'),
        body('lenderId').isNumeric().withMessage('lenderId must be a number'),
        body('isIncome').notEmpty().isBoolean().withMessage('Income must be boolean'),
        body('amount').isString().withMessage('amount must be a number'),
        query('*').isEmpty().withMessage('query data not allowed'),
        param('*').isEmpty().withMessage('query data not allowed'),
    ]
}

export { lenderValidator };
