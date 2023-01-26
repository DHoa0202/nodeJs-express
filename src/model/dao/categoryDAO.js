import sql from './sqlService.js';
import query from '../util/query.js';

class categoryDAO {
    async getList() {
        return await sql.execute('SELECT * FROM CATEGORIES').then(
            r => r.recordset
        ).catch(e => console.error(e));
    };
    async getById(id) {
        return await sql.execute(`SELECT * FROM CATEGORIES WHERE id = ${id}`).then(
            r => r.recordset[0]
        ).catch(e => console.error(e));
    };
    async insert(entity) {
        return await sql.execute(query.insert('CATEGORIES', entity)).then(
            r => r.rowsAffected
        ).catch(e => console.error(e));
    };
    async update(entity) {
        return await sql.execute(query.update('CATEGORIES', 'id', entity)).then(
            r => r.rowsAffected
        ).catch(e => console.error(e));
    };
    async delete(id) {
        return await sql.execute(query.delete('CATEGORIES', 'id', id)).then(
            r => r.rowsAffected 
        ).catch(e => console.error(e));
    };
}

export default new categoryDAO();