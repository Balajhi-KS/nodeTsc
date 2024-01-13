import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';

const JwtStrategy = Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:  process.env.SECRETKEY
  };
  
  // Usage example for the JwtStrategy
  passport.use( new JwtStrategy(jwtOptions,async (jwtPayload, done) =>{
    if(jwtPayload){
      return done(null,jwtPayload);
    }else{
      return done(null, false);
    }
  }));
  export { passport };