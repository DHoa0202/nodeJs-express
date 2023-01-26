import fs from 'fs';
import util from '../../model/util/util.js';
import dao from '../../model/dao/productDAO.js';
import cDao from '../../model/dao/categoryDAO.js';
import storage from '../../model/util/storage.js';
import dateRelative from '../../model/util/moment.js';

const routes = [...storage.breadcumb, { href: '#product', name: 'Sản phẩm' }];

class productControl {

    async products(req, res) {
        // get all categories when array is empty
        if (!storage.categories.length) await cDao.getList()
            .then(r => storage.categories = r)
            .catch(err => console.error(err));
        // get all products when array is empty 
        if (!storage.products.length) await dao.getList()
            .then(r => storage.products = r)
            .catch(err => console.error(err));

        return res.render('', productControl.#render())
    };

    async product(req, res) {
        let entity = {}; // get element by id
        await dao.getById(req.params['0'])
            .then(r => entity = r)
            .catch(err => console.error(err))
        return res.render('', productControl.#render({ entity: entity }))
    }

    async save(req, res) {
        // add file name if file already
        if (req.file) req.body['image'] = `/images/${req.file['filename']}`
        
        await dao.insert(req.body) // save data
            .then(r => storage.products.unshift(r))
            .catch(err => console.error(err));
        return res.render('', productControl.#render())
    }

    async update(req, res) {
        if (req.file) { // update file if exist
            await dao.getById(req.body.id).then(r => {
                if (!r.image.startsWith('http'))
                    fs.unlinkSync(fs.realpathSync(`src/app_static${r.image}`))
            }).catch(err => console.error(err));
            req.body['image'] = `/images/${req.file['filename']}`
        }

        await dao.update(req.body) // update data
            .then(r => util.update(storage.products, r, 'id'))
            .catch(err => console.error(err));
        return res.render('', productControl.#render())
    }

    async delete(req, res) {

        let id = req.params['0'];

        // delete file before delete data: get file name -> delete file on dest
        await dao.getById(id).then(r => {
            if (!r.image.startsWith('http'))
                fs.unlinkSync(fs.realpathSync(`src/app_static${r.image}`))
        }).catch(err => console.error(err));

        await dao.delete(id) // delete data by id
            .then(r => util.delete(storage.products, id, 'id'))
            .catch(err => console.error(err));

        return res.render('', productControl.#render());
    }

    static #render(change) {
        var response = {
            routes: routes, page: 'pages/product', date: dateRelative,
            data: storage.products, categories: storage.categories,
            entity: { id: -1, image: '/images/default.jpg' }
        }
        for (const key in change) response[key] = change[key];
        return response;
    }

}

export default new productControl();
