import sql from './sqlService.js';
import query from '../util/query.js';

class accountDAO {

    #setAccounts = async (accounts) => {
        for (const e of accounts) {
            e.password = String.fromCharCode(...e.password);
            await sql.execute( // get roles
                `SELECT * FROM AUTHORITIES`,
                `WHERE uid = '${e.username}'`
            ).then(rs => e['roles'] = rs.recordset.map(r => r.role))
        } return accounts
    }

    getList = (top, ...serials) => sql.execute(
        `SELECT TOP ${top || 1000} * FROM ACCOUNTS ${serials.join('\xa0').toString()}`
    ).then(r => this.#setAccounts(r.recordset)).catch(e => { throw e });

    getById = (username) => this.getList(undefined, `WHERE username = '${username}'`).then(r => r[0]);
    login = async (username, password) => {
        if (!username || !username.length) throw `cannot login with empty username!!!`
        else if (!password || !username.length) throw `cannot login with empty password!!!`

        return sql.execute(`EXECUTE LOGIN ${username}, ${password}`)
            .then(async r => (await this.#setAccounts(r.recordset))[0]).catch(e => { throw e })
    };

    insert = (entity) => sql
        .execute(query.insert('ACCOUNTS', entity))
        .then(_r => this.getList(1, 'ORDER BY username DESC').then(r2 => r2[0]))
        .catch(e => { throw e });

    update = (entity) => sql
        .execute(query.update('ACCOUNTS', 'username', entity))
        .then(_r => this.getById(entity['username']))
        .catch(e => { throw e });

    delete = (username) => sql
        .execute(query.delete('ACCOUNTS', 'username', username))
        .then(r => r.rowsAffected[0])
        .catch(e => { throw e });
}

export default new accountDAO();