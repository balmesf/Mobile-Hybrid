import AuthMiddleware from '../middleware/authentication';
import CinemaController from '../controllers/cinema_controller';

//* * CINEMA **//

module.exports = (router, app) => {
  router.route('/cinema')
    .get(AuthMiddleware.isAuthenticated, CinemaController.getAdresses);

  app.use('/', router);
};
