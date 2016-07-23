import * as mongoose from 'mongoose';
import * as winston from 'winston';

let database: Object = {
  /**
   * Connect to database
   */
  connect: function (): void {
    let MongoDB: any = mongoose.connect('mongodb://localhost/ng2-mean').connection;

    MongoDB.on('open', () => {
      winston.info('Connected to database');
    });

    MongoDB.on('error', (err: any) => {
      winston.error('Error connecting to database: ' + err);
    });
  }
};

module.exports = database;
