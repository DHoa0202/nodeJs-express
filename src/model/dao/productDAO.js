import moment from 'moment';
import sql from './sqlService.js';
import query from '../util/query.js';

class productDAO {

    getList = (top, ...serials) => sql.execute(
        `SELECT TOP ${top || 1000} p.*, c.name as 'category_name' FROM PRODUCTS p `,
        `INNER JOIN CATEGORIES c ON p.category_id=c.id ${serials.join('\xa0').toString()}`
    ).then(r => r.recordset
    ).catch(e => console.error(e));


    getById = (id) => this.getList(undefined, `WHERE p.id = ${id}`).then(r => r[0]);

    insert = async (entity) => {
        entity.regDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')
        
        return sql
            .execute(query.insert('PRODUCTS', entity, 'id', 'files'))
            .then(r => this.getList(1, 'ORDER BY id DESC').then(r2 => r2[0]))
            .catch(e => console.error(e));
    }

    async update(entity) {
        entity.regDate = moment(entity.regDate).format('YYYY-MM-DD HH:mm:ss.SSS')

        return await sql
            .execute(query.update('PRODUCTS', 'id', entity, 'id', 'files'))
            .then(r => this.getById(entity['id']))
            .catch(e => console.error(e));

    }
    async delete(id) {
        return await sql
            .execute(query.delete('PRODUCTS', 'id', id))
            .then(r => r.rowsAffected[0])
            .catch(e => console.error(e));
    }
}

export default new productDAO();