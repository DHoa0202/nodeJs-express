import sql from './sqlService.js';
import query from '../util/query.js';
import util from '../util/util.js';
import storage from '../util/storage.js';

const routes = [...storage.breadcumb, { href: '#category', name: 'Phân loại' }];

class categoryDAO {
    getList(req, resp) {
        // callback function
        sql.execute('SELECT * FROM', 'CATEGORIES').then(
            r => resp.render('', {
                routes: routes, page: 'pages/category',
                data: storage.categories = r.recordset, 
                entity: { id: storage.categories.slice(-1)[0].id + 1 }
            })
        ).catch(e => console.error(e));
    };
    getById(req, resp) {
        // callback function
        sql.execute(`SELECT * FROM CATEGORIES WHERE id = ${req.params['0']}`).then(
            r => resp.render('', {
                routes: routes, page: 'pages/category',
                data: storage.categories, entity: r.recordset[0]
            })
        ).catch(e => console.error(e));
    };
    insert(req, resp) {
        // callback function
        sql.execute(query.insert('CATEGORIES', req.body)).then(
            r => resp.render('', {
                routes: routes, page: 'pages/category',
                data: util.insert(storage.categories, req.body),
                entity: { id: (Number.parseInt(storage.categories.slice(-1)[0].id) + 1) }
            })
        ).catch(e => console.error(e));
    };
    update(req, resp) {
        // callback function
        sql.execute(query.update('CATEGORIES', 'id', req.body)).then(
            r => resp.render('', {
                routes: routes, page: 'pages/category',
                data: util.update(storage.categories, req.body, 'id'), 
                entity: { id: (Number.parseInt(storage.categories.slice(-1)[0].id) + 1) }
            })
        ).catch(e => console.error(e));
    };
    delete(req, resp) {
        // callback function
        sql.execute(query.delete('CATEGORIES', 'id', req.params['0'])).then(
            r => resp.render('', {
                routes: routes, page: 'pages/category', entity: {},
                data: util.delete(storage.categories, req.params['0'], 'id')
            })
        ).catch(e => console.error(e));
    };
}

export default new categoryDAO();