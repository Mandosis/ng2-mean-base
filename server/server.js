"use strict";

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const winston = require('winston');
const database = require('./database');
const router = require('./routes/router');
const app = express();

/**
 * Connect to database
 */
database.connect();

/*
 * Configuration
 */
winston.addColors({
    debug: 'green',
    info: 'cyan',
    silly: 'magenta',
    warn: 'yellow',
    error: 'red'
});
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    level: process.env.LOG_LEVEL,
    colorize: true
});

// Parse application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

// Protect server
app.use(helmet());

/**
 * Router
 */
// app.use('/', router);

/**
 * Start a webserver on a port specified by an environment variable
 * Default: 3000
 */
var server = app.listen(process.env.PORT || 3000, function () {
    let port = server.address().port;
    winston.info('Listening on port', port);
});
