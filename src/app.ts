import { Server } from 'http';
import express, { Application, Request, Response, json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import apiV1 from './routes/apiV1.routes';
import notFoundRouter from './routes/404';
import sequelize from './db/db.config';
import serverError from './routes/500';

const app: Application = express();
let server: Server;
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
// middlwares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// routes
app.use('/api/v1', apiV1);
app.use(serverError);
app.use(notFoundRouter);

export default {
  start(port: number) {
    server = app.listen(port, async () => {
      try {
        await sequelize.sync();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      console.log(`Server is listening on ${port} port`);
    });
    return server;
  },
  stop(cb?: (err?: Error) => void): Server {
    console.log(`\nTrying to close the server..\n`);
    return server.close(cb);
  },
};
