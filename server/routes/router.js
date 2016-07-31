"use strict";

const express = require('express');
const ngApp = require('./ngApp');

let router = express.Router();

/**
 * API Routes
 */

 // Put routes here

/**
 * Wildcard route for Angular 2 Universal
 * Warning: Keep at the very bottom
 */
router.get('/*', ngApp);

module.exports = router;
