import mssql from "mssql"
import dotenv from "dotenv"
import config from '../../app_config/mssqlConfig.js';

const properties = dotenv.config().parsed;

export default {
    execute: async (...serials) => {
        let p = (await mssql.connect(config)).request();
        if(properties.SHOW_SQL=='true') console.log(serials.join('\xa0').toString());
        return p.query(serials.join('\xa0').toString());
    }, mssql
};