import express from "express";
import multer from 'multer';
import appControl from '../controller/appController.js';
import categoryControl from '../controller/categoryControl.js';
import productControl from '../controller/productControl.js';

const router = express.Router();
// multer working only with enctype: 'multipart/form-data'
const upload = multer({ dest: 'src/app_static/images' });

export default (app) => {
    //  => urlencoded json || multer  req.body
    // app.use(express.urlencoded({ extended: true }));
    // app.use(express.json());

    // APP METHODS
    router.get('/info', appControl.info);
    router.get('/home', appControl.home);

    // CATEGORY
    router
        .get('/categories', categoryControl.categories)
        .get('/categories/*', categoryControl.category)
        .get('/delete_categories/*', categoryControl.delete)
        .post('/insert_categories', upload.none(), categoryControl.save)
        .post('/update_categories', upload.none(), categoryControl.update);

    router.get('/api/v1/categories', categoryControl.api.categories)
        .get('/api/v1/categories/*', categoryControl.api.category)
        .post('/api/v1/categories', upload.none(), categoryControl.api.save)
        .put('/api/v1/categories', upload.none(), categoryControl.api.update)
        .delete('/api/v1/category/*', categoryControl.api.delete);

    // PRODUCT
    router
        .get('/products', productControl.products)
        .get('/products/*', productControl.product)
        .get('/delete_products/*', productControl.delete)
        .post('/insert_products', upload.single('files'), productControl.save)
        .post('/update_products', upload.single('files'), productControl.update);

    // OTHERS path redirect to home page
    router.get('/*', appControl.home);

    return app.use('/', router);
}
