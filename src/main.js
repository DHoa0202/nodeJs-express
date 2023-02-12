import dotenv from 'dotenv';
import express from 'express';
import viewEngine from './app_config/viewEngine.js';
import fileController from './control/controller/fileController.js';
import router from './control/router.js';

// VARIABLES
const properties = dotenv.config().parsed;
const application = express();
const host = properties.HOST || 'localhost';
const port = properties.PORT || 8080;

// CONFIGURATION
application.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

fileController(application);
viewEngine(application); // security
router(application); // router

// START SERVER
application.listen(port, () => console.log(
    `\napplication start on http://${host}:${port}\n`
));