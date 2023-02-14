import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import moment from 'moment';

const properties = dotenv.config().parsed;
const secretKey = properties.SECRET;
const option = { expiresIn: '1h' }; // an hour [s,m,h...]

// RESTRTCT EXECUTE QUERY
const jsonToken = {
    sign: (object) => jwt.sign(object, secretKey, option),
    verify: (token) => {
        try {
            const object = jwt.verify(token, secretKey, option);
            return object;
        } catch (error) {
            moment.locale('en')
            const time = moment(error.expiredAt).format('LLLL')
            return { message: `access token expired at: ${time}` }
        }
    }
}
export default jsonToken;