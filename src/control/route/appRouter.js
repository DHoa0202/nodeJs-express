import express from "express";
import control from '../controller/appController.js';

let router = express.Router();

export default (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
    // APP METHODS
    router.get('/info', control.app.info);

    // CATEGORY
    router
        .get('/categories', control.categoryDAO.getList)
        .get('/categories/*', control.categoryDAO.getById)
        .get('/delete_categories/*', control.categoryDAO.delete)
        .post('/insert_categories', control.categoryDAO.insert)
        .post('/update_categories', control.categoryDAO.update);
    
    // PRODUCT
    router
        .get('/products', control.productDAO.getList)
        .get('/products/*', control.productDAO.getById)
        .get('/delete_products/*', control.productDAO.delete)
        .post('/insert_products', control.productDAO.insert)
        .post('/update_products', control.productDAO.update);

    // OTHERS
    router.get('/*', control.app.home);

    return app.use('/', router);
}
