import express from "express";
import control from '../controller/appController.js';

let router = express.Router();

export default (app) => {
    
    // METHODS
    router.get('/info', control.getInfo);
    router.get('/category', control.getCategory);
    router.get('/product', control.getProduct);

    router.get('/*', control.getHome);
    return app.use('/', router);
}
