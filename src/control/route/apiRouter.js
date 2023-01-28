import express from "express";
import categoryControl from '../controller/categoryControl.js';
import productControl from '../controller/productControl.js';

const router = express.Router();

// APIs FOR CLIENT SIDE RENDER
export default (app) => {
    app.use(express.json());

    router // CATEGORIES API
        .get('/categories', categoryControl.api.categories) // get all
        .get('/categories/*', categoryControl.api.category) // get by id
        .post('/categories', categoryControl.api.save)
        .put('/categories', categoryControl.api.update)
        .delete('/categories/*', categoryControl.api.delete); // delete by id

    router // PRODUCTS API
        .get('/products', productControl.api.products) // get all
        .get('/products/*', productControl.api.product) // get by id
        .post('/products', productControl.api.save)
        .put('/products', productControl.api.update)
        .delete('/products/*', productControl.api.delete); // delete by id
    
    return router;
}