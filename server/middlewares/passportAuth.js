import passport from 'passport';
import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';
import User from '../models/User';

const localOpts = {
  usernameField: 'email'
};

passport.use(new LocalStrategy(User.authenticate()));

const localStrategy = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({
        email
      });
      if (!user) {
        return done(null, false);
      } else if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }
);

passport.use(localStrategy);
const authLocal = passport.authenticate('local', {
  session: false
});

export default authLocal;
