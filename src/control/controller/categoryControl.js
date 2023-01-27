
import util from '../../model/util/util.js';
import dao from '../../model/dao/categoryDAO.js';
import storage from '../../model/util/storage.js';

const routes = storage.breadcumb.concat({ href: '#category', name: 'Phân loại' });

class categotyControl {

    categories = (_req, res) => dao.getList()
        .then(r => storage.categories = r)
        .catch(err => console.error(err))
        .finally(() => res.render('', categotyControl.#render()));

    category = async (req, res) => {
        let entity = { id: -1 }
        return dao.getById(req.params['0'])
            .then(r => entity = r)
            .catch(err => console.error(err))
            .finally(() => res.render('', categotyControl.#render({ entity: entity })));
    }

    save = (req, res) => dao.insert(req.body)
        .then(r => storage.categories.unshift(r))
        .catch(err => console.error(err.originalError.message))
        .finally(() => res.render('', categotyControl.#render()));

    update = (req, res) => dao.update(req.body)
        .then(r => util.update(storage.categories, r, 'id'))
        .catch(err => console.error(err.originalError.message))
        .finally(() => res.render('', categotyControl.#render()));

    delete = (req, res) => dao.delete(req.params['0'])
        .then(_r => util.delete(storage.categories, req.params['0'], 'id'))
        .catch(err => console.error(err.originalError.message))
        .finally(() => res.render('', categotyControl.#render()));

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

export default new categotyControl();
