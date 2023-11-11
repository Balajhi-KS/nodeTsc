"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const express_validator_1 = require("express-validator");
class Validate {
    constructor() {
        this.validate = (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }
            next();
        };
    }
}
exports.Validate = Validate;
//  export { validate };
