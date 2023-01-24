function getIndex(column, value, array) {
    if (!value || !array) return -1; // # 0==false
    if (column) for (let i = 0; i < array.length; i++) if (array[i][column] == value) return i;
    else for (let i = 0; i < array.length; i++) if (array[i] == value) return i; return -1;
};
export default {
    // get index of array data
    getIndexOf: getIndex,
    insert: (array, entity, by) => {
        let i = getIndex(by, entity[by], array);
        if(i < 0) array.push(entity);
        else throw `The ${entity[by]} value of the key ${by} already exist!`
        return array;
    },
    update: (array, entity, by) => {
        let i = getIndex(by, entity[by], array);
        if(-1 < i) array[i] = entity;
        else throw `The ${entity[by]} value of the key ${by} does not exist!`
        return array;
    },
    delete: (array, value, by) => {
        let i = getIndex(by, value, array);
        if(-1 < i) array.splice(i, 1);
        else throw `The ${value} value of the key ${by} does not exist!`
        return array;
    },
    // create parameters: default File:<files=...> & directory: <dir=...>
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