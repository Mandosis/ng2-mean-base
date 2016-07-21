import * as express from 'express';
import * as winston from 'winston';

// Angular 2 Universal
import {provideRouter} from '@angular/router';
import {enableProdMode} from '@angular/core';
import {
  expressEngine,
  BASE_URL,
  REQUEST_URL,
  ORIGIN_URL,
  NODE_LOCATION_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

// client root component
import {App, routes} from '../client';


const router = express.Router();

function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';

  let config: ExpressEngineConfig = {
    directives: [ App ],

    // dependencies shared among all requests to server
    platformProviders: [
      {provide: ORIGIN_URL, useValue: 'http://localhost:3000'},
      {provide: BASE_URL, useValue: baseUrl},
    ],

    // dependencies re-created for each request
    providers: [
      {provide: REQUEST_URL, useValue: url},
      provideRouter(routes),
      NODE_LOCATION_PROVIDERS,
      NODE_HTTP_PROVIDERS,
    ],

    // if true, server will wait for all async to resolve before returning response
    async: true,

    // if you want preboot, you need to set selector for the app root
    // you can also include various preboot options here (explained in separate document)
    preboot: false // { appRoot: 'app' }
  };

  res.render('index', config);
}

// send all requests to Angular Universal
router.get('/*', ngApp);

module.exports = router;
