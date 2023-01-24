import sql from './sqlService.js';
import query from '../util/query.js';
import util from '../util/util.js';
import storage from '../util/storage.js';
import dateRelative from '../util/momen.js';

const routes = [...storage.breadcumb, { href: '#product', name: 'Sản phẩm' }];

class productDAO {

    getList(req, res) {
        // callback function
        sql.execute(
            "SELECT p.*, c.name as 'category_name' FROM PRODUCTS p ",
            "INNER JOIN CATEGORIES c ON p.category_id=c.id"
        ).then(
            r => res.render('', {
                routes: routes, page: 'pages/product', date: dateRelative,
                data: storage.products = r.recordset, entity: r.recordset[0],
                categories: storage.categories
            })
        ).catch(e => console.error(e));
    };
    getById(req, resp) {
        // callback function
        sql.execute(
            "SELECT p.*, c.name as 'category_name' FROM PRODUCTS p ",
            `INNER JOIN CATEGORIES c ON p.category_id=c.id WHERE p.id = ${req.params['0']}`
        ).then(
            r => resp.render('', {
                routes: routes, page: 'pages/product', date: dateRelative,
                data: storage.products, entity: r.recordset[0],
                categories: storage.categories
            })
        ).catch(e => console.error(e));
    };
    insert(req, resp) {
        throw new Error('todo...')
    };
    update(req, resp) {
        throw new Error('todo...')
    };
    delete(req, resp) {
        throw new Error('todo...')
    };
}

export default new productDAO();