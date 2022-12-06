import sql from '../../model/dao/sqlService.js';
import dateRelative from '../../model/util/momen.js';
var breadcumb = [
    { href: '/', name: 'Node' },
    { href: '/home', name: 'Trang chủ' }
]
export default {
    getHome(req, res) {
        return res.render('', { routes: breadcumb, page: 'pages/home' });
    },
    getInfo(req, res) {
        return res.render('', {
            routes: [...breadcumb, { href: '#info', name: 'Thông tin' }], page: 'pages/info'
        })
    },
    getCategory(req, res) {
        // callback function
        sql.execute('SELECT * FROM', 'CATEGORIES').then(
            r => res.render('', {
                routes: [...breadcumb, { href: '#category', name: 'Phân loại' }],
                data: r.recordset, page: 'pages/category'
            })
        ).catch(e => console.error(e));
    },
    getProduct(req, res) {
        // callback function
        sql.execute("SELECT c.name as 'category_name', p.* FROM PRODUCTS p ",
            "INNER JOIN CATEGORIES c ON p.category_id=c.id").then(
                r => res.render('', {
                    routes: [...breadcumb, { href: '#product', name: 'Sản phẩm' }],
                    data: r.recordset, page: 'pages/product', date: dateRelative
                })
            ).catch(e => console.error(e));
    }
}