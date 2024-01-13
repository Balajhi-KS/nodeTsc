"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerify = void 0;
const common_service_1 = require("../services/commonService/common.service");
class UserVerify {
    constructor() {
        this.checkUseToken = (header) => {
            const decryptData = this.commonService.decryptDetails(header);
            return JSON.parse(decryptData);
        };
        this.commonService = new common_service_1.CommonSevices();
    }
}
exports.UserVerify = UserVerify;
