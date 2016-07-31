"use strict";
require('angular2-universal/polyfills');

// Angular 2 Universal
const ngRouter = require('@angular/router');
const universal = require('angular2-universal');

// client root component
const main = require('../public/main.bundle');

function ngApp(req, res) {
    var baseUrl = '/';
    var url = req.originalUrl || '/';
    var config = {
        directives: [main.App],
        // dependencies shared among all requests to server
        platformProviders: [
            { provide: universal.ORIGIN_URL, useValue: 'http://localhost:3000' },
            { provide: universal.BASE_URL, useValue: baseUrl },
        ],
        // dependencies re-created for each request
        providers: [
            { provide: universal.REQUEST_URL, useValue: url },
            ngRouter.provideRouter(main.routes),
            universal.NODE_LOCATION_PROVIDERS,
            universal.NODE_HTTP_PROVIDERS,
        ],
        // if true, server will wait for all async to resolve before returning response
        async: true,
        // if you want preboot, you need to set selector for the app root
        // you can also include various preboot options here (explained in separate document)
        preboot: false // { appRoot: 'app' }
    };
    res.render('index', config);
}

module.exports = ngApp;
