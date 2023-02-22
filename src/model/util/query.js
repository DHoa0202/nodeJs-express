function setValues(values) {
    for (const i in values) if(isNaN(values[i])) values[i] = `N'${values[i]}'`
}

export default {

    insert : (table, data, ...leave) => {
        let entity = Object.assign({}, data);
        for (let out of leave) delete entity[out];
        let keys = Object.keys(entity);
        let values = Object.values(entity);

        setValues(values);
        return `INSERT INTO ${table}(${keys.toString()}) VALUES(${values.toString()})`
    },

    update : (table, key, data, ...leave) => {
        let entity = Object.assign({}, data);
        for (let out of leave) delete entity[out];
        let keys = Object.keys(entity);
        let query = `UPDATE ${table} SET `;

        setValues(entity);
        for (const k of keys) query+=k+'='+entity[k]+',';
        return `${query.slice(0,-1)} WHERE ${key}=${data[key]}`;
    },

    delete : (table, by, value) => `DELETE FROM ${table} WHERE ${by} = ${value}`
}