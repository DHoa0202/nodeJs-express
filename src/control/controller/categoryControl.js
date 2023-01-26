
import util from '../../model/util/util.js';
import dao from '../../model/dao/categoryDAO.js';
import storage from '../../model/util/storage.js';

const routes = [...storage.breadcumb, { href: '#category', name: 'Phân loại' }];

class categotyControl {

    categories = (req, res) => dao.getList().then(
        r => res.render('', {
            routes: routes, page: 'pages/category',
            data: storage.categories = r,
            entity: { id: storage.categories.slice(-1)[0].id + 1 }
        })
    ).catch(err => console.error(err));

    category = (req, res) => dao.getById(req.params['0']).then(
        r => res.render('', {
            routes: routes, page: 'pages/category',
            data: storage.categories, entity: r
        })
    ).catch(err => console.error(err));

    save = (req, res) => dao.insert(req.body).then(
        r => res.render('', {
            routes: routes, page: 'pages/category',
            data: util.insert(storage.categories, req.body),
            entity: { id: (Number.parseInt(storage.categories.slice(-1)[0].id) + 1) }
        })
    ).catch(err => console.error(err));

    update = (req, res) => dao.update(req.body).then(
        r => res.render('', {
            routes: routes, page: 'pages/category',
            data: util.update(storage.categories, req.body, 'id'),
            entity: { id: (Number.parseInt(storage.categories.slice(-1)[0].id) + 1) }
        })
    ).catch(err => console.error(err));

    delete = (req, res) => dao.delete(req.params['0']).then(
        r => res.render('', {
            routes: routes, page: 'pages/category', entity: {},
            data: util.delete(storage.categories, req.params['0'], 'id')
        })
    ).catch(err => console.error(err));

}

export default new categotyControl();
