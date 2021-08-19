//authentication for entry using passport

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const keys = process.env.JWT_USER_SECRET_KEY;

const jwtOps = {};

jwtOps.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOps.secretOrKey = keys;

const useJWTLoginStrategy = new JwtStrategy(jwtOps, async (payload, done) => {
  const userEmail = payload.userEmail;

  try {
    if (userEmail) {
      const user = await User.findOne({ email: userEmail }).select("-password");

      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } else {
      return done(null, false);
    }
  } catch (e) {
    return done(e, false);
  }
});
