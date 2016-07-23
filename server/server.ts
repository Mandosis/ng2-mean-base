import 'angular2-universal/polyfills';
import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'bodyParser';
import * as winston from 'winston';
import * as database from './database';
import * as router from './routes/router';

const app: any = express();

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
  warn:  'yellow',
  error: 'red'
});
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level: process.env.LOG_LEVEL,
  colorize:true
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
app.use('/', router);

/**
 * Start a webserver on a port specified by an environment variable
 * Default: 3000
 */
let server: any = app.listen(process.env.PORT || 3000, () => {
  let port: number = server.address().port;
  winston.info('Listening on port', port);
});
