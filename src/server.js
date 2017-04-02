import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from './db';
import routes from './routes';
import api from './controllers';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
    exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
    limit: config.bodyLimit
}));

app.use(cookieParser());

// connect to db
db.connect(config.URL, (err, db) => {

    // // internal middleware
    app.use(routes({ config }));

    // // api router
    app.use('/api', api({ config }));


    if (err) err;
    app.server.listen(process.env.PORT || config.port);
    console.log(`Started on port ${app.server.address().port}`);

});

// initializeDb.connect()

export default app;
