import express from "express";
import multer from 'multer';
import appControl from '../controller/appController.js';
import categoryControl from '../controller/categoryControl.js';
import productControl from '../controller/productControl.js';

// multer only works with (enctype || contentType): 'multipart/form-data'
const upload = multer({ dest: 'src/app_static/images' });
const expressRouter = express.Router();

((router) => {

    // APP METHODS
    router
        .get('/info', appControl.info)
        .get('/home', appControl.home)
        .get('/angularJS', appControl.angularApp)

    // CATEGORY
    router
        .get('/categories', categoryControl.categories) // get all
        .get('/categories/*', categoryControl.category) // get by id
        .get('/delete_categories/*', categoryControl.delete) // delete by id
        .post('/insert_categories', upload.none(), categoryControl.save)
        .post('/update_categories', upload.none(), categoryControl.update);

    // PRODUCT
    router
        .get('/products', productControl.products) // get all
        .get('/products/*', productControl.product) // get by id
        .get('/delete_products/*', productControl.delete) // delete by id
        .post('/insert_products', upload.single('files'), productControl.save)
        .post('/update_products', upload.single('files'), productControl.update);

    // OTHERS path redirect to home page
    router.get('/*', appControl.home);
})(expressRouter);

// SERVER SIDE RENDER
export default (_app) => expressRouter;
