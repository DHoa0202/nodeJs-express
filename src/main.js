import dotenv from 'dotenv';
import express from 'express';
import viewEngine from './app_config/viewEngine.js';
import application from './control/route/appRouter.js';

// VARIABLES
const properties = dotenv.config().parsed;
const app = express();
const port = properties.PORT || 8080;

// CONFIGURATION
viewEngine(app); // security
application(app) // router

// START SERVER
app.listen(port,()=>console.log(`Application start server with port: ${port}`));