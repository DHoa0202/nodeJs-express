import sql from "mssql"
import config from '../../app_config/mssqlConfig.js';

export default {
    execute:async (...serials) => {
        const p = await sql.connect(config);
        return await p.request().query(serials.join('\xa0').toString());
    }
};