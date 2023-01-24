import categoryDAO from '../../model/dao/categoryDAO.js';
import productDAO from '../../model/dao/productDAO.js';
import storage from '../../model/util/storage.js';

export default {
    categoryDAO, productDAO,
    app: {
        home(req, res) {
            return res.render('', { routes: storage.breadcumb, page: 'pages/home' });
        },
        info(req, res) {
            return res.render('', {
                routes: [...storage.breadcumb, { href: '#info', name: 'Thông tin' }], page: 'pages/info'
            })
        }
    }
}