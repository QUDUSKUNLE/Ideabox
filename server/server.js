// Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import Router from './routes/index';

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 3000;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use('/api/v1/users/', Router);

if (process.env.NODE_ENV !== 'production') {
  if (process.env.NODE_ENV === 'test') {
    mongoose.connect(process.env.MONGODB_URL);
  } else {
    mongoose.connect(process.env.MONGODB_URL_DEV);
  }
} else {
  mongoose.connect(process.env.MONGODB_URL_PRO);
}

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.listen(port);

module.exports = app;
