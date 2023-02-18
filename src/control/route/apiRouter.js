import express, { Router } from "express";
import { api as category } from '../controller/categoryControl.js';
import { api as product } from '../controller/productControl.js';
import { api as account } from '../controller/accountControl.js';

const expressRouter = Router();
const notfound = (req, res, _next) => {
    const origin = req.headers?.origin || req.headers?.host;
    console.log(`request api from ${origin}`);

    return res.status(404).json({
        message: `${req.baseUrl} not found!!!`,
        listAPIs: [
            '/api/categories',
            '/api/products',
            '/api/accounts',
        ]
    })
}

((router) => {

    router // CATEGORIES API
        .get('/categories', category.getList) // get all
        .get('/categories/*', category.getById) // get by id
        .post('/categories', category.save)
        .put('/categories', category.update)
        .delete('/categories/*', category.delete); // delete by id

    router // PRODUCTS API
        .get('/products', product.getList) // get all
        .get('/products/*', product.getById) // get by id
        .post('/products', product.save)
        .put('/products', product.update)
        .delete('/products/*', product.delete); // delete by id

    router // ACCOUNTS API
        .post('/accounts/login', account.login)
        .post('/accounts/logout', account.logout)
        .get('/accounts', account.getList) // get all
        .get('/accounts/*', account.getById) // get by id
        .post('/accounts', account.save)
        .put('/accounts', account.update)
        .delete('/accounts/*', account.delete); // delete by id

    return router;
})(expressRouter);

// APIs FOR CLIENT SIDE RENDER
export default (app) => {
    app.use(express.json());
    return expressRouter;
};