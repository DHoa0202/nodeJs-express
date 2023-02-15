import appRouter from './route/appRouter.js';
import apiRouter from './route/apiRouter.js';
import fileRouter from './route/fileRouter.js'
import appMw from './middleware/appMiddleware.js';
import apiMw from './middleware/apiMiddleware.js';

export default (application) => {

    /**
     * application.get('/api/test1/*', (req, res) => res.json({id: req.params['0']}))
     * application.get('/api/test2/:id', (req, res) => res.json({id: req.params['id']}))
     */

    application
        .use('/file', appMw, fileRouter(application)) // SERVER SIDE RENDER
        .use('/app', appMw, appRouter(application)) // SERVER SIDE RENDER
        .use('/api', apiMw.accessControl, apiRouter(application)) // API FOR CLIENT
}