function setValues(values) {
    for (const i in values) if(isNaN(values[i])) values[i] = "'"+values[i]+"'"
}

export default {
    insert : (table, data) => {
        let keys = Object.keys(data);
        let values = Object.values(data);

        setValues(values);
        return `INSERT INTO ${table}(${keys.toString()}) VALUES(${values.toString()})`
    },
    update : (table, key, data) => {
        let entity = Object.assign({}, data);
        let keys = Object.keys(data);
        let query = `UPDATE ${table} SET `;
        
        setValues(entity);
        for (const k of keys) query+=k+'='+entity[k]+',';
        return `${query.slice(0,-1)} WHERE ${key}=${entity[key]}`;
    },
    delete : (table, by, value) => `DELETE FROM ${table} WHERE ${by} = ${value}`
}