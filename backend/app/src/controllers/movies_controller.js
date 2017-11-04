import HttpStatus from 'http-status-codes';
import fetch from 'node-fetch';
import config from 'config';

/* * UTILS * */
const formatUrlMovie = (data) => {
  const movies = data.results.map((d) => {
    const url = `https://image.tmdb.org/t/p/w300${d.poster_path}`;
    d.picture_url = url;
    return d;
  });
  return movies;
};

//* * MOVIES **//

const URI = config.get('moviesAPI.url');

exports.getTopRated = (req, res) => {
  const page = req.query.page;
  const url = `${URI}/movie/top_rated?api_key=${process.env.API_KEY}&page=${page}`;

  fetch(url)
    .then(data => data.json()).then((json) => {
      res.status(HttpStatus.OK).send(formatUrlMovie(json));
    }).catch((e) => {
      res.status(HttpStatus.NOT_FOUND).send({ message: e });
    });
};

exports.getUpcomming = (req, res) => {
  const page = req.query.page;
  const url = `${URI}/movie/upcoming?api_key=${process.env.API_KEY}&page=${page}`;

  fetch(url)
    .then(data => data.json()).then((json) => {
      res.status(HttpStatus.OK).send(formatUrlMovie(json));
    }).catch((e) => {
      res.status(HttpStatus.NOT_FOUND).send({ message: e });
    });
};

exports.getNewest = (req, res) => {
  const page = req.query.page;
  const url = `${URI}/movie/now_playing?api_key=${process.env.API_KEY}&page=${page}`;

  fetch(url)
    .then(data => data.json()).then((json) => {
      res.status(HttpStatus.OK).send(formatUrlMovie(json));
    }).catch((e) => {
      res.status(HttpStatus.NOT_FOUND).send({ message: e });
    });
};
