import sql from './sqlService.js';
import query from '../util/query.js';

class categoryDAO {
    async getList(top, ...serials) {
        let sqlQuery = `SELECT TOP ${top || 1000} * FROM CATEGORIES ${serials.join('\xa0').toString()}`;
        return await sql.execute(sqlQuery)
            .then(r => r.recordset)
            .catch(e => { throw e });
    };

    getById = (id) => this
        .getList(undefined, `WHERE id = ${id}`)
        .then(r => r[0])
        .catch(e => { throw e });

    async insert(entity) {
        let entity2 = { id: -1 };
        return await sql.execute(query.insert('CATEGORIES', entity))
            .then(_r => this.getById(entity['id']).then(r => entity2 = r))
            .catch(e => { throw e })
            .finally(() => entity2);
    };

    async update(entity) {
        let entity2 = { id: -1 };
        return await sql.execute(query.update('CATEGORIES', 'id', entity))
            .then(_r => this.getById(entity['id']).then(r => entity2 = r))
            .catch(e => { throw e })
            .finally(() => entity2);
    };

    delete = (id) => sql
        .execute(query.delete('CATEGORIES', 'id', id))
        .then(r => r.rowsAffected[0])
        .catch(e => { throw e })
}

export default new categoryDAO();