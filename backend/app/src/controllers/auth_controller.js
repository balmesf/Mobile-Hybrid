import HttpStatus from 'http-status-codes';
import UserModel, { model as User } from '../models/user';

exports.removeToken = (req, res, done) => {
  const token = req.header('Authorization');

  UserModel.findUserByTokenQuery(token).exec((err, user) => {
    if (err) { res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err }); }
    if (user === null) {
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Token no longer valid' });
    }
    let profile = new User();

    profile = user;
    if (profile.access_token) { profile.access_token = ''; }

    profile.save((error, result) => {
      if (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error });
      }

      return done(result);
    });
  });
};
