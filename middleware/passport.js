"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const JwtStrategy = passport_jwt_1.Strategy;
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'password'
};
// Usage example for the JwtStrategy
passport_1.default.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (jwtPayload) {
        return done(null, jwtPayload);
    }
    else {
        return done(null, false);
    }
})));
