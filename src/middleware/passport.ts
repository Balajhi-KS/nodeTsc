import { Strategy, ExtractJwt } from 'passport-jwt';

const JwtStrategy = Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:  'password'
  };
  
  // Usage example for the JwtStrategy
  const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // You can implement your JWT authentication logic here
    // jwtPayload contains the decoded JWT payload
    // Call done(err, user) to indicate success or failure
    // e.g., if user is authenticated, call done(null, user);
  });
  export { jwtStrategy, jwtOptions };