import dao from '../../model/dao/accountDAO.js';
import jsonToken from '../../model/util/jsontoken.js'

class accountControl {

}

const api = {

    // login by username and password
    login: async (req, res) => {
        const [username, password] = [req.body['username'], req.body['password']];

        return dao.login(username, password)
            .then(account => {
                delete account?.password;
                if (!account) return res.status(401).json({
                    account: { username, password },
                    message: "username or password incorrect!!!"
                });
                return res.status(200).json({ accessToken: `${jsonToken.sign(account)}` });
            }).catch(err => res.status(401).json({ message: err }))
    },

    // login by username and password
    logout: (req, res, _next) => {
        const token = req.body['authorization'];
        if (token) {
            console.log(token);
        }

        return res.status(200).json({ message: `you have successfully logged out` })
    },

    // get all accounts
    getList: (_req, res) => dao.getList()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error)),

    // get account by id
    getById: (req, res) => dao.getById(req.params['0'])
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error)),

    // insert account
    save: (req, res) => dao.insert(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error)),

    // update account
    update: (req, res) => dao.update(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error)),

    // delete account
    delete: (req, res) => dao.delete(req.params['0'])
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error)),
}

export { api }
export default new accountControl();
