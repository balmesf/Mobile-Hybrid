import HttpStatus from 'http-status-codes';
import jwt from 'jwt-simple';
import moment from 'moment';
import { Strategy as LocalStrategy } from 'passport-local';
import { model as User, schema as UserSchema } from '../models/user';

module.exports = (passport) => {
  const createJWT = (user) => {
    let payload = {};
    if (user === undefined) {
      payload = {
        user,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
      };
    } else {
      payload = {
        user: user.user_id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
      };
    }
    return jwt.encode(payload, process.env.TOKEN_SECRET);
  };


  //* * LOCAL SIGNUP **//
  passport.use('signup', new LocalStrategy({
    usernamelField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, username, password, done) => {
    process.nextTick(() => {
      User.findOne({ user_id: username }, (err, user) => {
        if (err) return done(err);

        if (user) return done(err);

        const newUser = new User();
        const token = createJWT(username, process.env.TOKEN_SECRET);
        newUser.user_id = req.body.username;
        newUser.email = req.body.email;
        newUser.password = UserSchema.methods.generateHash(req.body.password);
        newUser.access_token = token;
        newUser.registrationDate = Date.now();
        newUser.save((error) => {
          if (error) {
            return done(error);
          }
          return done(null, newUser);
        });
      });
    });
  }));

  //* * LOGIN LOCAL **/
  passport.use('login', new LocalStrategy({
    usernamelField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, username, password, done) => {
    process.nextTick(() => {
      User.findOne({ user_id: username }, (err, user) => {
        if (err) { return done(err); }

        if (!user || user.length === 0) { return done(null, false); }

        if (!UserSchema.methods.verifyPassword(password, user.password)) {
          return done(null, {
            status_code: HttpStatus.UNAUTHORIZED,
          });
        }

        const token = createJWT(user, process.env.TOKEN_SECRET);
        user.access_token = token;
        user.save((error) => {
          if (error) {
            return done(error);
          }
          return done(null, user);
        });
      });
    });
  }));
};
