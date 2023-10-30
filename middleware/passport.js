"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtOptions = exports.jwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const JwtStrategy = passport_jwt_1.Strategy;
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'password'
};
exports.jwtOptions = jwtOptions;
// Usage example for the JwtStrategy
const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // You can implement your JWT authentication logic here
    // jwtPayload contains the decoded JWT payload
    // Call done(err, user) to indicate success or failure
    // e.g., if user is authenticated, call done(null, user);
});
exports.jwtStrategy = jwtStrategy;
