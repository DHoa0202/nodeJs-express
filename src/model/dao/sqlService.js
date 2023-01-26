import mssql from "mssql"
import config from '../../app_config/mssqlConfig.js';

export default {
    execute: async (...serials) => {
        let p = (await mssql.connect(config)).request();
        return p.query(serials.join('\xa0').toString());
    }, mssql
};