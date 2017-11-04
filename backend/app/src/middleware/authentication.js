import HttpStatus from 'http-status-codes';
import jwt from 'jwt-simple';
import moment from 'moment';
import { model as User } from '../models/user';


exports.isAuthenticated = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Token Authorization is required.' });
  }
  const token = req.header('Authorization');
  let payload = null;

  User.findOne({ access_token: token }, (err, user) => {
    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err });
    }
    if (user !== null) {
      if (user.access_token !== undefined) {
        try {
          payload = jwt.decode(token, process.env.TOKEN_SECRET);
        } catch (e) {
          return res.status(HttpStatus.UNAUTHORIZED).send({
            status_code: HttpStatus.UNAUTHORIZED,
            message: e.message,
          });
        }

        if (payload.exp <= moment().unix()) {
          return res.status(HttpStatus.UNAUTHORIZED).send({
            status_code: HttpStatus.UNAUTHORIZED,
            message: 'Token has expired.',
          });
        }
        req.user = payload.user_id;
        return next();
      }
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send({
        status_code: HttpStatus.UNAUTHORIZED,
        message: 'Token has expired.',
      });
    }
  });
};
