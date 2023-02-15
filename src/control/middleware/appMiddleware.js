
const defaultFs = (_req, _res, next) => {
    // check login/logout || decentralization
    next();
}

/**
 * access for roles
 * ex: use accounts api => have any role as "ADMIN"
 */
const middleware = {
}


export default defaultFs
export { middleware };