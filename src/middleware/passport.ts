import { Strategy, ExtractJwt,StrategyOptions, VerifiedCallback } from "passport-jwt";
import passport from "passport";
import memoryCache from "./memory.cache";
import { NextFunction, Request, Response } from "express";

const JwtStrategy = Strategy;
interface JwtPayload {
  sub: string;
  name: string;
  iat?: number;
  exp?: number;
}
const jwtOptions:StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRETKEY as string,
};

// Usage example for the JwtStrategy
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload:JwtPayload, done:VerifiedCallback) => {
    if (jwtPayload && checkIfUserValid(jwtPayload)) {
      return done(null, jwtPayload);
    } else {
      return done(null, false);
    }
  })
);
const checkIfUserValid = (req: Request | any) => {
  const getTokenBy= 'tokenId_' + req?.id;
  const memory = memoryCache.get(getTokenBy);
  if ((memory !== req?.validateToken) || !memory) {
    return false;
  }
  return true;
}
export { passport };
