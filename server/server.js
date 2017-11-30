// Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import dbConfig from './config/dbConfig';
import Router from './routes/index';

dotenv.config();

if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://127.0.0.1:27017/ideabox');
} else {
  mongoose.connect(dbConfig.urlProduction);
}
const port = parseInt(process.env.PORT, 10) || 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(Router);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));


app.listen(port, (err) => {
  if (err) {
    return (err, 'but stuff works');
  }
});

module.exports = app;
