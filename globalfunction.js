"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReE = exports.Reponse = exports.to = exports.TE = void 0;
const zlib = __importStar(require("zlib"));
const pe = __importStar(require("parse-error"));
// export class GlobalFunction {
//     constructor() {}
const to = function (promise) {
    return promise
        .then(data => {
        return [null, data];
    }).catch(err => [pe(err)]);
};
exports.to = to;
const TE = function (err_message, log) {
    if (log === true) {
        console.error(err_message);
    }
    throw new Error(err_message);
};
exports.TE = TE;
const ReE = function (res, err, code) {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }
    if (typeof code !== 'undefined')
        res.statusCode = code;
    return res.json({ success: false, error: err });
};
exports.ReE = ReE;
const Reponse = function (res, data, code) {
    let send_data = { success: true };
    if (typeof data == 'object') {
        send_data = Object.assign(data, send_data); //merge the objects
    }
    const jsonString = JSON.stringify(send_data);
    zlib.gzip(jsonString, (err, buffer) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (typeof code !== 'undefined')
            res.statusCode = code;
        res.set({
            'Content-Encoding': 'gzip',
            'Content-Type': 'application/json',
        });
        res.send(buffer);
    });
};
exports.Reponse = Reponse;
// }
//This is here to handle all the uncaught promise rejections
// process.on('unhandledRejection', error => {
//         console.error('Uncaught Error', pe(error));
// });
