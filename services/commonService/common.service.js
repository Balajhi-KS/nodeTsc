"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonSevices = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const config_1 = require("../../config/config");
class CommonSevices {
    constructor() {
        /**
         * async function for decrypting the tokens and id details
         */
        this.decryptDetails = (data) => {
            if (data) {
                const bytes = crypto_js_1.default.AES.decrypt(data.toString(), config_1.CONFIG.secretKey);
                const result = bytes.toString(crypto_js_1.default.enc.Utf8).replace(/\|/g, "\\");
                // console.log('result', result);
                return result;
            }
            else {
                return null;
            }
        };
        /**
         * async function for encrypting the tokens and id details
         */
        this.encryptDetails = (data, secretKey) => {
            if (data) {
                const text = crypto_js_1.default.AES.encrypt(data.toString(), config_1.CONFIG.secretKey).toString();
                return text.replace(/\\/g, '|');
            }
            else {
                return null;
            }
        };
    }
}
exports.CommonSevices = CommonSevices;
