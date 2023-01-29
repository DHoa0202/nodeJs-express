import fs from 'fs'
import storage from '../../model/util/storage.js';

export default {
    home(_req, res) {
        return res.render('', { routes: storage.breadcumb, page: 'pages/home' });
    },
    info(_req, res) {
        return res.render('', {
            routes: storage.breadcumb.concat({ href: '#info', name: 'Information' }), page: 'pages/info'
        })
    },
    angularApp: (_req, res) => res.render('', {
        routes: storage.breadcumb.concat({ href: '#angular', name: 'AngularJS APP' }), page: 'pages/angularApp'
    })
}