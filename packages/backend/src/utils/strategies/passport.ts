import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import UserService from '../../services/user.service';
import ApiError from '../../helpers/error/ApiError';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const userService = new UserService();
      const user = await userService.getUserById(jwtPayload.id);
      if (user && user.confirmed) {
        return done(null, user);
      }
      return done(ApiError.notAuth(), false);
    } catch (error) {
      return done(ApiError.notAuth(), false);
    }
  })
);

export const JWTStrategy = passport.initialize();
