import { Router } from 'express';
import db from '../db.js';

let homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.send("Hello Home!");
});

homeRouter.get('/more', (req, res) => {
    res.send("Hello Home more !");
});

homeRouter.post('/connect-to-mongo-db', (req, res) => {
    const collection = db.get().collection('movies');
    console.log(req.body, 'request -> body');
    collection.insert(req.body, (err, result) => {
        if (err) err;
        if (result) res.end('data received');
    });
});

export default homeRouter;
