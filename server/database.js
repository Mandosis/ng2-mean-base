"use strict";

const mongoose = require('mongoose');
const winston = require('winston');

let database = {
  /**
   * Connect to database
   */
  connect: function () {
    let MongoDB = mongoose.connect('mongodb://localhost/ng2-mean').connection;

    MongoDB.on('open', () => {
      winston.info('Connected to database');
    });

    MongoDB.on('error', (err) => {
      winston.error('Error connecting to database: ' + err);
    });
  }
};

module.exports = database;
