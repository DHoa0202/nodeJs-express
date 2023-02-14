import jsonToken from "../../model/util/jsontoken.js";

const middleware = {
    accessControl: (_req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    },
    authorization: (req, res, next) => {
        let auth = req.headers['authorization'];
        if (auth) {
            auth = auth.replace('Bearer ', '');
            return res.status(200).json(jsonToken.verify(auth))
        }
        next();
    }
}

export default middleware;