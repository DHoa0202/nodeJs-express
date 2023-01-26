import express from "express";
import multer from 'multer';
import appControl from '../controller/appController.js';
import categoryControl from '../controller/categoryControl.js';
import productControl from '../controller/productControl.js';


const router = express.Router();
const upload = multer({ dest: 'src/app_static/images' });

export default (app) => {
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
        .post('/insert_categories', categoryControl.save)
        .post('/update_categories', categoryControl.update);
    
    // PRODUCT
    router
        .get('/products', productControl.products)
        .get('/products/*', productControl.product)
        .get('/delete_products/*', productControl.delete)
        .post('/insert_products', upload.single('files'), productControl.save)
        .post('/update_products', upload.single('files'), productControl.update);

    // OTHERS
    router.get('/*', appControl.home);

    return app.use('/', router);
}
