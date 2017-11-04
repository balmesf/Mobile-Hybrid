import AuthMiddleware from '../middleware/authentication';
import MoviesController from '../controllers/movies_controller';

module.exports = (router, app) => {
  router.route('/movies/top_rated')
    .get(AuthMiddleware.isAuthenticated, MoviesController.getTopRated);

  router.route('/movies/upcomming')
    .get(AuthMiddleware.isAuthenticated, MoviesController.getUpcomming);

  router.route('/movies/new')
    .get(AuthMiddleware.isAuthenticated, MoviesController.getNewest);

  app.use('/', router);
};
