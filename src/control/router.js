
import fileControl from './controller/fileController.js';
import appRouter from './route/appRouter.js';
import apiRouter from './route/apiRouter.js';
import mw from './middleware/routerMiddleware.js'

export default (application) => {

    /**
     * application.get('/api/test1/*', (req, res) => res.json({id: req.params['0']}))
     * application.get('/api/test2/:id', (req, res) => res.json({id: req.params['id']}))
     */

    application
        .use('/app', mw.accessControl, appRouter(application)) // SERVER SIDE RENDER
        .use('/api', mw.accessControl, apiRouter(application)) // API FOR CLIENT
        .use('/file', mw.accessControl, fileControl(application)) // FILE UPLOAD
        .use('/', appRouter(application)); // ANY PATH REDIRECT TO appRouter
}