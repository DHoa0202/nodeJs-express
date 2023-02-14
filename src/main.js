import dotenv from 'dotenv';
import express from 'express';
import viewEngine from './app_config/viewEngine.js';
import router from './control/router.js';

// VARIABLES
const properties = dotenv.config().parsed;
const application = express();
const host = properties.HOST || 'localhost';
const port = properties.PORT || 8080;

// CONFIGURATION
viewEngine(application); // security
router(application); // router

// START SERVER
application.listen(port, () => console.log(
    `\napplication start on http://${host}:${port}\n`
));