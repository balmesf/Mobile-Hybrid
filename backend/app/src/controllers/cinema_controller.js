import HttpStatus from 'http-status-codes';
import fetch from 'node-fetch';
import config from 'config';

//* * MOVIES **//

const URI = config.get('cinemaAPI.url');

exports.getAdresses = (req, res) => {
  const opts = 'dataset=cinemas-a-paris&facet=art_et_essai&facet=arrondissement';
  fetch(`${URI}${opts}`)
    .then(data => data.json()).then((json) => {
      res.status(HttpStatus.OK).send(json.records);
    }).catch((e) => {
      res.status(HttpStatus.NOT_FOUND).send({ message: e });
    });
};
