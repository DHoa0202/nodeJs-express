
import util from '../../model/util/util.js';
import dao from '../../model/dao/categoryDAO.js';
import storage from '../../model/util/storage.js';

const routes = storage.breadcumb.concat({ href: '#category', name: 'Category' });

class categoryControl {

    categories = (_req, res) => dao.getList()
        .then(r => storage.categories = r)
        .catch(err => console.error(err))
        .finally(() => res.render('', categoryControl.#render()));

    category = async (req, res) => {
        let entity = { id: -1 }
        return dao.getById(req.params['0'])
            .then(r => entity = r)
            .catch(err => console.error(err))
            .finally(() => res.render('', categoryControl.#render({ entity: entity })));
    }

    save = (req, res) => dao.insert(req.body)
        .then(r => storage.categories.unshift(r))
        .catch(err => console.error(err.message))
        .finally(() => res.render('', categoryControl.#render()));

    update = (req, res) => dao.update(req.body)
        .then(r => util.update(storage.categories, r, 'id'))
        .catch(err => console.error(err.message))
        .finally(() => res.render('', categoryControl.#render()));

    delete = (req, res) => dao.delete(req.params['0'])
        .then(_r => util.delete(storage.categories, req.params['0'], 'id'))
        .catch(err => console.error(err.message))
        .finally(() => res.render('', categoryControl.#render()));

    static #render(change) {

        let temp = storage.categories;
        temp = temp.length ? (Number.parseInt(temp.slice(-1)[0].id) + 1) : 1
        var response = {
            routes: routes, page: 'pages/category',
            data: storage.categories, entity: { id: temp }
        }
        for (const key in change) response[key] = change[key];
        return response;
    }
}

const api = {
    // get all categories
    getList: (_req, res) => dao.getList()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error)),
    // get category by id
    getById: (req, res) => dao.getById(req.params['0'])
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error)),
    // insert category
    save: (req, res) => dao.insert(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error)),
    // update category
    update: (req, res) => dao.update(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error)),
    // delete category
    delete: (req, res) => dao.delete(req.params['0'])
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error)),
}

export { api }
export default new categoryControl();
