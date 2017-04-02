import { Router } from 'express';

// import sub-routers
import homeRouter from './home';

export default ({ config, db }) => {
    let api = Router();

    // perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json('Hello api');
    });

    // mount the facets resource
    api.use('/home', homeRouter);

    return api;
}
