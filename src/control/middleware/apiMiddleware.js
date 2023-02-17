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
    },

    notfound: (req, res, _next) => {
        const origin = req.headers?.origin || req.headers?.host;
        console.log(`request api from ${origin}`);

        return res.status(404).json({
            message: `${req.baseUrl} not found!!!`,
            listAPIs: [
                '/api/categories',
                '/api/products',
                '/api/accounts',
            ]
        })
    }
}

export default middleware;