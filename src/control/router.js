
import appRouter from './route/appRouter.js';
import apiRouter from './route/apiRouter.js';

export default (application) => {

    /**
     * application.get('/api/test1/*', (req, res) => res.json({id: req.params['0']}))
     * application.get('/api/test2/:id', (req, res) => res.json({id: req.params['id']}))
     */ 

    application
        .use('/app', appRouter(application)) // SERVER SIDE RENDER
        .use('/api', apiRouter(application)) // API FOR CLIENT
        /*    
            .use('/api/v1', apiRouter1(application))
            .use('/api/v2', apiRouter1(application))
            .use('/api/v3', apiRouter1(application))
        */
        .use('/', appRouter(application)); // ANY PATH REDIRECT TO appRouter
}