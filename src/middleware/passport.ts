import { Strategy, ExtractJwt,StrategyOptions, VerifiedCallback } from "passport-jwt";
import passport from "passport";

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
    if (jwtPayload) {
      return done(null, jwtPayload);
    } else {
      return done(null, false);
    }
  })
);
export { passport };
