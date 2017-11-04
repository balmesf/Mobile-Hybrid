/* eslint-env node */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import bluebird from 'bluebird';
import cors from 'cors';
import passport from 'passport';
import { config, load } from 'dotenv';

config({ path: '../.env' });
load();


const app = express();
const port = process.env.PORT || 1337;
const router = express.Router();

/** * CONFIG ** */
mongoose.Promise = bluebird.Promise;
mongoose.connect(process.env.DB_URI, { useMongoClient: true })
  .then(() => {
    console.log(`connected to the db : ${process.env.DB_URI}.`);
  }).catch((err) => {
    console.error(err);
    process.exit();
  });

const corsOptions = {
  origin: 'https://mobile-hybride.herokuapp.com/',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
  credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());


// /*** AUTH CONFIG ***/
app.use(passport.initialize());
require('./middleware/passport')(passport);

// //*** AUTH ***//
require('./routes/authentication')(router, passport);

// //*** API ***//
require('./routes/cinema')(router, app);
require('./routes/movies')(router, app);


app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});

module.exports = app;
