import HttpStatus from 'http-status-codes';
import AuthController from '../controllers/auth_controller';


module.exports = (router, passport) => {
  router.post('/signup', passport.authenticate('signup', {
    failureRedirect: '/signup',
    session: false,
  }), (req, res) => {
    res.status(HttpStatus.CREATED).send(req.user);
  });

  router.get('/fail_login', (req, res) => {
    res.status(HttpStatus.UNAUTHORIZED).send({
      status_code: HttpStatus.UNAUTHORIZED,
      message: 'Invalid username or password.',
    });
  });

  router.post('/login', passport.authenticate('login', {
    session: false,
    failureRedirect: '/fail_login',
  }), (req, res) => {
    res.status(HttpStatus.OK).send(req.user);
  });

  router.get('/logout', (req, res) => {
    AuthController.removeToken(req, res, (result) => {
      if (result) {
        res.status(HttpStatus.OK).send({ message: 'Succesfully Logout' });
      }
    });
  });
};
