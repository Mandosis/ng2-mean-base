import * as mongoose from 'mongoose';
import * as winston from 'winston';

let database = {};

/**
 * Connect to database
 */
database.connect = () => {
  let MongoDB = mongoose.connect('mongodb://localhost/ng2-mean').connection;

  MongoDB.on('open', () => {
    winston.info('Connected to database');
  });

  MongoDB.on('error', (err) => {
    winston.error('Error connecting to database: ' + err);
  });
};

module.exports = database;
