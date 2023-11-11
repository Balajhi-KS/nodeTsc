"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseValidator = void 0;
const express_validator_1 = require("express-validator");
const expenseValidator = {
    createCategory: [
        (0, express_validator_1.body)('categoryName').isString().withMessage('categoryName must be an array'),
        (0, express_validator_1.body)('categoryImage').isString().withMessage('categoryImage must be an array')
    ]
};
exports.expenseValidator = expenseValidator;
