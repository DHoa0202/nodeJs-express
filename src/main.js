// IMPORT PACKAGES
import express from 'express';
import viewEngine from './config/viewEngine.js';

// VARIABLES
const app = express();
const port = process.env.PORT || 8080;

// CONFIGURATION
viewEngine(app);

// METHODS
app.get('/', (req, res) => {
    res.render('home.ejs');
});

// START SERVER
app.listen(port,()=>console.log(`Application start server with port: ${port}`));