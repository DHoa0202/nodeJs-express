import storage from '../../model/util/storage.js';

export default {
    home(_req, res) {
        return res.render('', { routes: storage.breadcumb, page: 'pages/home' });
    },
    info(_req, res) {
        return res.render('', {
            routes: storage.breadcumb.concat({ href: '#info', name: 'Thông tin' }), page: 'pages/info'
        })
    }
}