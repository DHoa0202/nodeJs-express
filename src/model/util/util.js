function getIndex(column, value, array) {
    if (!value || !array) return -1; // # 0==false
    if (column) for (let i = 0; i < array.length; i++) if (array[i][column] == value) return i;
    else for (let i = 0; i < array.length; i++) if (array[i] == value) return i; return -1;
};

export default {
    /**
     * @param {string} column is attribute name EX: 'id' | undefined
     * @param {any} value is value of id
     * @param {Array} array to find index of value
     * @return {number} of index if exist || -1 if doesn't exist
     */
    getIndexOf: getIndex,
    /**
     * @param {Array} array to push
     * @param {object} entity add to array
     * @param {string} by is the condition column name
     * @return {Array} array
     */
    insert: (array, entity, by) => {
        let i = getIndex(by, entity[by], array);
        if (i < 0) array.push(entity);
        else throw `The ${entity[by]} value of the key ${by} already exist!`
        return array;
    },
    /**
     * @param {Array} array to set
     * @param {object} entity update on array
     * @param {string} by is the condition column name
     * @return {Array} array
     */
    update: (array, entity, by) => {
        let i = getIndex(by, entity[by], array);
        if (-1 < i) array[i] = entity;
        else throw `The ${entity[by]} value of the key ${by} does not exist!`
        return array;
    },
    /**
     * @param {Array} array to remove
     * @param {object} value of column [by] to delete 
     * @param {string} by is the condition column name
     * @return {Array} array
     */
    delete: (array, value, by) => {
        let i = getIndex(by, value, array);
        if (-1 < i) array.splice(i, 1);
        else throw `The ${value} value of the key ${by} does not exist!`
        return array;
    },
    // create form.body for client: default File:<files=...> & directory: <dir=...>
    getMultipart: (entity, input, dir) => {
        if (!input.files) return [entity];

        let files = input.files;
        let data = new FormData();
        let keys = Object.keys(entity);

        data.append('dir', dir)
        for (f of files) data.append('files', f) // prepare files
        for (k of keys) data.append(k, entity[k]) // prepare entity's fields

        return [data, {
            TransformRequest: angular.identity,
            headers: { 'content-Type': undefined }
        }];
    }
}