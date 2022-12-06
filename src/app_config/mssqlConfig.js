import dotenv from 'dotenv';

const properties = dotenv.config().parsed;
const sqlConfig = {
    user: properties.DB_USER,
    password: properties.DB_PWD,
    database: properties.DB_NAME,
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 20000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}
export default sqlConfig;